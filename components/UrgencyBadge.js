// Text colors are the darkened tokens from globals.css, chosen so every
// pairing clears WCAG AA (4.5:1) against its tint background - verified,
// not eyeballed (see the contrast check in the polish pass).
const META = {
  red: { label: "Seek care now", bg: "#fbe9ec", fg: "#b3123f" },
  yellow: { label: "See a doctor soon", bg: "#fbf1de", fg: "#7a5906" },
  green: { label: "Monitor at home", bg: "#e8f6ec", fg: "#0d6b35" },
};

export default function UrgencyBadge({ level, size = "lg" }) {
  const meta = META[level] ?? META.green;
  const padding = size === "lg" ? "px-5 py-2 text-lg" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-semibold ${padding}`}
      style={{ background: meta.bg, color: meta.fg }}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.fg }} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
