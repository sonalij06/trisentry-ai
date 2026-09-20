import Link from "next/link";

const MODULES = [
  {
    href: "/triage",
    title: "Symptom Triage",
    description: "Describe symptoms in your own words and get an urgency level grounded in public emergency-warning-sign criteria.",
    accent: "var(--accent)",
  },
  {
    href: "/maternal",
    title: "Maternal Danger-Sign Screener",
    description: "Check symptoms against WHO's published pregnancy danger signs, used to train community health workers.",
    accent: "var(--maternal)",
  },
  {
    href: "/medication",
    title: "Medication Safety Check",
    description: "Photograph pill bottles and check for well-documented dangerous drug interactions.",
    accent: "var(--green)",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">TriSentry AI</h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          One shared risk engine, three ways to catch danger signs early — before they become
          emergencies.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3">
        {MODULES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:shadow-md focus-visible:shadow-md"
          >
            <span
              className="mb-3 inline-block h-1.5 w-10 rounded-full"
              style={{ background: m.accent }}
              aria-hidden="true"
            />
            <h2 className="font-semibold">{m.title}</h2>
            <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{m.description}</p>
            <span className="mt-4 text-sm font-medium" style={{ color: m.accent }}>
              Open →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
