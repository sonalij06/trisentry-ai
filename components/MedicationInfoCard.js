function Field({ label, value, tone }) {
  if (!value) return null;
  return (
    <div>
      <p className={`font-semibold ${tone ?? "text-[var(--ink)]"}`}>{label}</p>
      <p className="text-[var(--muted)]">{value}</p>
    </div>
  );
}

export default function MedicationInfoCard({ medication }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-lg font-semibold">{medication.name}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{medication.whatItIs}</p>

      <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 text-sm">
        {medication.ingredients?.length > 0 && (
          <Field label="Active ingredients" value={medication.ingredients.join(", ")} />
        )}
        <Field label="Used for" value={medication.usedFor} />
        <Field label="How it's taken" value={medication.howToTake} />
        <Field label="Dosage as printed on this label" value={medication.labelDosage} />
        <Field label="Common side effects" value={medication.commonSideEffects} />
        <Field label="Seek help if" value={medication.seekHelpIf} tone="text-[var(--red)]" />
      </div>
    </div>
  );
}
