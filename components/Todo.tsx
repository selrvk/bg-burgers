/**
 * A visible, deliberately ugly marker for anything not yet confirmed by the
 * owner. It is loud on purpose — unverified content must be impossible to
 * ship by accident, and the owner should be able to spot every gap while
 * scrolling the demo on their phone.
 *
 * Every one of these is also collected in HANDOFF.md.
 * Remove a marker by filling in the matching field in lib/content.ts.
 */
export function Todo({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "paper";
}) {
  const palette =
    tone === "paper"
      ? "border-red bg-red/10 text-[#7c1614]"
      : "border-gold bg-gold/12 text-gold-soft";

  return (
    <p
      className={`my-3 flex gap-2.5 rounded-lg border-2 border-dashed px-3.5 py-3 text-sm leading-snug ${palette}`}
      data-todo="owner"
    >
      <span aria-hidden="true" className="shrink-0 font-bold">
        ✎
      </span>
      <span>
        <strong className="font-bold uppercase tracking-wide">To confirm with owner: </strong>
        {children}
      </span>
    </p>
  );
}
