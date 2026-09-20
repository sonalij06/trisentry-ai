"use client";

import { useState } from "react";
import { MATERNAL_RULES } from "@/lib/rules/maternal";
import UrgencyBadge from "@/components/UrgencyBadge";
import MatchedRuleList from "@/components/MatchedRuleList";

export default function MaternalPage() {
  const [selected, setSelected] = useState(new Set());
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/maternal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedIds: [...selected] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch {
      setError("Something went wrong reaching the server.");
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">Maternal Danger-Sign Screener</h1>
      <p className="mt-2 text-[var(--muted)]">
        Check any signs present right now. These match WHO's published pregnancy danger signs, the
        same list used to train community health workers.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-2">
        {MATERNAL_RULES.map((rule) => (
          <label
            key={rule.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--maternal)]/40 has-[:checked]:border-[var(--maternal)] has-[:checked]:bg-[var(--maternal)]/5"
          >
            <input
              type="checkbox"
              checked={selected.has(rule.id)}
              onChange={() => toggle(rule.id)}
              className="h-4 w-4 accent-[var(--maternal)]"
            />
            {rule.label}
          </label>
        ))}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 rounded-xl bg-[var(--maternal)] px-6 py-3 font-semibold text-white transition hover:bg-[#a8386a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Checking…" : "Check danger signs"}
        </button>
      </form>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-[var(--red)]/30 bg-[#fbe9ec] p-4 text-[var(--red)]">
          {error}
        </div>
      )}

      {status === "done" && result && (
        <div className="result-enter mt-8 space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <UrgencyBadge level={result.level} />
            {result.summary && <p className="mt-4 text-[var(--ink)]">{result.summary}</p>}
          </div>

          {result.matched?.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-[var(--muted)]">Matched danger signs</h2>
              <MatchedRuleList matched={result.matched} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
