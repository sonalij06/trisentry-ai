import { LEVEL_META } from "@/lib/riskEngine";

export default function UrgencyBadge({ level, size = "lg" }) {
  const meta = LEVEL_META[level] ?? LEVEL_META.green;
  const padding = size === "lg" ? "px-5 py-2 text-lg" : "px-3 py-1 text-sm";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex items-center gap-2 rounded-full font-semibold ${padding}`}
        style={{ background: meta.bg, color: meta.color }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
        {meta.label}
      </span>
      <span className="text-sm font-semibold" style={{ color: meta.color }}>
        {meta.timing}
      </span>
    </div>
  );
}
