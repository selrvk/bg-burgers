import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: no server, no database. Drops onto Vercel/Netlify free tier
  // and cannot break at 9pm on a Saturday.
  output: "export",
  trailingSlash: true,

  images: {
    // `next build` cannot optimise images without a server, so the pipeline in
    // scripts/images.mjs pre-renders a WebP ladder and this loader picks from it.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Kept in step with LADDER in scripts/images.mjs.
    deviceSizes: [400, 640, 900, 1200, 1600, 2048],
    imageSizes: [180, 320],
  },
};

export default nextConfig;
