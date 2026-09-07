/**
 * Build-time image pipeline. Runs from `npm run images`.
 *
 * Source of truth is ../photos (the owner's originals — never modified).
 * Everything written here lands in public/img and is regenerable, so it is
 * safe to delete. The output feeds lib/images.ts, which the custom next/image
 * loader reads to build srcsets for the static export.
 */
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("../photos");
const OUT = path.resolve("public/img");
// Capped at 1600: nothing on the page is displayed wider than that even on a
// high-DPR desktop, and a 2048px variant would push the hero past its 200KB budget.
const LADDER = [400, 640, 900, 1200, 1600];
const QUALITY = 72;

/** Photos that go through the responsive ladder. */
const PHOTOS = [
  "sinlge_burger_shot.jpg",
  // place_shot.jpeg is deliberately absent: it is only used for the desktop
  // banner, and that goes through the watermark-cropped "hero-wide" variant
  // below. Shipping the uncropped ladder as well would be ~900KB of dead files.
  "place_shot2.jpeg",
  "food_from_menu_shot.jpg",
  "chicken_wings_shot.jpg",
  "burgers_shot.jpeg",
  "burgers_w_bacon_shot.jpeg",
];

const slug = (f) => path.basename(f, path.extname(f)).replace(/_/g, "-");

/**
 * Strip the white studio background off the logo.
 *
 * A naive "make every white pixel transparent" would also punch holes in the
 * white outline around "Burgers" and the white highlights inside the burger,
 * so this flood-fills inward from the border instead: only white that is
 * connected to the edge is removed. Interior white survives.
 */
async function cutoutLogo(srcPath) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;

  const isNearWhite = (i) => data[i] > 234 && data[i + 1] > 234 && data[i + 2] > 234;

  // Iterative flood fill from every border pixel (a recursive one blows the stack).
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) {
    stack.push(x, (h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    stack.push(y * w, y * w + w - 1);
  }

  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    const i = p * ch;
    if (!isNearWhite(i)) continue;
    seen[p] = 1;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }

  // Feather: a pixel bordering the removed region gets partial alpha, which
  // keeps the JPEG's antialiased edges from turning into a hard white fringe.
  for (let p = 0; p < w * h; p++) {
    const i = p * ch;
    if (seen[p]) {
      data[i + 3] = 0;
      continue;
    }
    const x = p % w;
    const y = (p / w) | 0;
    let removedNeighbours = 0;
    if (x > 0 && seen[p - 1]) removedNeighbours++;
    if (x < w - 1 && seen[p + 1]) removedNeighbours++;
    if (y > 0 && seen[p - w]) removedNeighbours++;
    if (y < h - 1 && seen[p + w]) removedNeighbours++;
    if (removedNeighbours > 0) {
      const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i + 3] = Math.round(255 * (1 - Math.min(1, lightness / 255)));
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .trim({ threshold: 1 });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const file of PHOTOS) {
    const src = path.join(SRC, file);
    if (!existsSync(src)) {
      console.warn(`  ! missing ${file} — skipped`);
      continue;
    }
    const name = slug(file);
    const meta = await sharp(src).metadata();
    const widths = LADDER.filter((x) => x <= meta.width);
    if (!widths.includes(meta.width) && widths.length === 0) widths.push(meta.width);

    for (const width of widths) {
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(path.join(OUT, `${name}-${width}.webp`));
    }

    // Tiny inline placeholder so nothing reflows while the real file streams in.
    const lqip = await sharp(src)
      .resize({ width: 16 })
      .blur(1)
      .webp({ quality: 30 })
      .toBuffer();

    manifest[name] = {
      width: meta.width,
      height: meta.height,
      widths,
      blur: `data:image/webp;base64,${lqip.toString("base64")}`,
    };
    console.log(`  ✓ ${name} — ${widths.join(", ")}`);
  }

  // --- Wide hero crop -------------------------------------------------------
  // place_shot has the logo watermarked into the sky. On the desktop hero that
  // lands directly beside the logo in the header, which reads as a stock-photo
  // placeholder. Cropping off the top third removes the watermark and keeps
  // what actually sells the place: the string lights, umbrellas and full tables.
  const wideSrc = path.join(SRC, "place_shot.jpeg");
  if (existsSync(wideSrc)) {
    const meta = await sharp(wideSrc).metadata();
    const top = Math.round(meta.height * 0.43);
    const region = { left: 0, top, width: meta.width, height: meta.height - top };
    const cropped = await sharp(wideSrc).extract(region).toBuffer();
    const cropMeta = await sharp(cropped).metadata();

    const widths = LADDER.filter((w) => w <= cropMeta.width);
    for (const width of widths) {
      await sharp(cropped)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(path.join(OUT, `hero-wide-${width}.webp`));
    }
    const lqip = await sharp(cropped).resize({ width: 16 }).blur(1).webp({ quality: 30 }).toBuffer();
    manifest["hero-wide"] = {
      width: cropMeta.width,
      height: cropMeta.height,
      widths,
      blur: `data:image/webp;base64,${lqip.toString("base64")}`,
    };
    console.log(`  ✓ hero-wide (watermark cropped) — ${cropMeta.width}×${cropMeta.height}`);
  }

  // --- Logo -----------------------------------------------------------------
  const logoSrc = path.join(SRC, "bg_burgers_logo.jpg");
  if (existsSync(logoSrc)) {
    const cut = await cutoutLogo(logoSrc);
    const cutBuf = await cut.toBuffer();
    const cutMeta = await sharp(cutBuf).metadata();

    for (const width of [180, 320, 480, 720]) {
      await sharp(cutBuf)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88, effort: 6 })
        .toFile(path.join(OUT, `logo-${width}.webp`));
    }
    // Full-resolution transparent logo for the owner's own use (tarpaulins,
    // packaging, Facebook). Deliberately outside public/ so the 0.5MB PNG is
    // never shipped to a visitor's phone.
    const brandDir = path.resolve("../brand");
    await mkdir(brandDir, { recursive: true });
    await sharp(cutBuf).png().toFile(path.join(brandDir, "bg-burgers-logo-transparent.png"));

    manifest["logo"] = {
      width: cutMeta.width,
      height: cutMeta.height,
      widths: [180, 320, 480, 720],
      blur: "",
    };
    console.log(`  ✓ logo cutout — ${cutMeta.width}×${cutMeta.height}`);

    // Apple touch icon: the logo on the brand navy, since iOS ignores alpha.
    await sharp({
      create: { width: 180, height: 180, channels: 4, background: "#12233d" },
    })
      .composite([
        {
          input: await sharp(cutBuf)
            .resize({ width: 156, height: 156, fit: "inside" })
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png()
      .toFile(path.join(OUT, "apple-touch-icon.png"));
    console.log("  ✓ apple-touch-icon");
  }

  // --- Open Graph card ------------------------------------------------------
  // 1200×630, built from the strongest photo so a shared link looks like the
  // food. Facebook is where these links actually get pasted.
  const ogBase = path.join(SRC, "sinlge_burger_shot.jpg");
  if (existsSync(ogBase)) {
    const photo = await sharp(ogBase)
      .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
      .modulate({ brightness: 0.82 })
      .toBuffer();

    const overlay = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="35%" stop-color="#0b1626" stop-opacity="0"/>
            <stop offset="100%" stop-color="#0b1626" stop-opacity="0.92"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#g)"/>
        <text x="64" y="500" font-family="Helvetica,Arial,sans-serif" font-size="76"
              font-weight="bold" fill="#ffffff">BG Burgers</text>
        <text x="64" y="556" font-family="Helvetica,Arial,sans-serif" font-size="30"
              fill="#f4b055">Grilled at its best · Pallocan East, Batangas City</text>
        <text x="64" y="600" font-family="Helvetica,Arial,sans-serif" font-size="24"
              fill="#e8dfd0">Open Tue&#8211;Sun, 5PM till 11PM</text>
      </svg>`);

    await sharp(photo)
      .composite([{ input: overlay }])
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT, "og.jpg"));
    console.log("  ✓ og.jpg 1200×630");
  }

  await writeFile(
    path.resolve("lib/images.generated.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(`\nWrote ${Object.keys(manifest).length} entries to lib/images.generated.json`);
}

await mkdir(path.resolve("lib"), { recursive: true });
await main();
