export default function MatchedRuleList({ matched }) {
  if (!matched || matched.length === 0) return null;

  return (
    <div className="space-y-3">
      {matched.map((rule) => (
        <div key={rule.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="font-medium">{rule.label}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{rule.advice}</p>
        </div>
      ))}
    </div>
  );
}
