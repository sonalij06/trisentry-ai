"use client";

import { useState } from "react";
import UrgencyBadge from "@/components/UrgencyBadge";
import MatchedRuleList from "@/components/MatchedRuleList";

export default function TriagePage() {
  const [symptoms, setSymptoms] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
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
      <h1 className="text-2xl font-bold">Symptom Triage</h1>
      <p className="mt-2 text-[var(--muted)]">
        Describe what's happening in your own words. We check it against public emergency-warning-sign
        criteria and tell you how urgently to seek care.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <textarea
          required
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. Sudden chest pain and I feel short of breath, started 20 minutes ago..."
          rows={5}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition hover:bg-[#1a5fc9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Checking…" : "Check urgency"}
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
              <h2 className="mb-3 text-sm font-semibold text-[var(--muted)]">Matched criteria</h2>
              <MatchedRuleList matched={result.matched} />
            </div>
          )}

          {!result.usedAi && (
            <p className="text-xs text-[var(--muted)]">
              Showing a keyword-based match, not AI interpretation — either GEMINI_API_KEY isn't
              set, or the AI call didn't succeed this time. Try again in a moment.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
