"use client";

import { useState } from "react";
import UrgencyBadge from "@/components/UrgencyBadge";
import MedicationInfoCard from "@/components/MedicationInfoCard";

const MAX_DIMENSION = 1024;

// Downscales the photo client-side before we base64-encode it, so a
// multi-megabyte phone photo doesn't blow past serverless request-body
// limits or slow the vision call down.
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MedicationPage() {
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImage(file);
    setPreview(dataUrl);
    setResult(null);
    setStatus("idle");
  }

  async function handleSubmit() {
    if (!preview) return;
    setStatus("loading");
    setError("");

    const [, mediaType, base64] = preview.match(/^data:(.+);base64,(.+)$/) ?? [];

    try {
      const res = await fetch("/api/medication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
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
      <h1 className="text-2xl font-bold">Medication Safety Check</h1>
      <p className="mt-2 text-[var(--muted)]">
        Photograph the labels of pill bottles you take. We check the medications against a curated
        list of well-documented dangerous combinations.
      </p>

      <div className="mt-6 space-y-4">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center transition hover:border-[var(--green)]/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--accent)] has-[:focus-visible]:outline-offset-2">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            className="sr-only"
          />
          <span className="text-sm font-medium text-[var(--green)]">
            {preview ? "Choose a different photo" : "Upload a photo of the pill bottle labels"}
          </span>
        </label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Selected pill bottle photo" className="max-h-64 rounded-xl border border-[var(--border)]" />
        )}
        <button
          onClick={handleSubmit}
          disabled={!preview || status === "loading"}
          className="rounded-xl bg-[var(--green)] px-6 py-3 font-semibold text-white transition hover:bg-[#0a5429] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Reading photo…" : "Check for interactions"}
        </button>
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-[var(--red)]/30 bg-[#fbe9ec] p-4 text-[var(--red)]">
          {error}
        </div>
      )}

      {status === "done" && result && (
        <div className="result-enter mt-8 space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <UrgencyBadge level={result.level} />
            {result.medications?.length > 0 && (
              <p className="mt-4 text-sm text-[var(--muted)]">
                Read from photo: {result.medications.map((m) => m.name).join(", ")}
              </p>
            )}
            {result.message && <p className="mt-2 text-[var(--ink)]">{result.message}</p>}
          </div>

          {result.found?.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-[var(--muted)]">Interactions found</h2>
              <div className="space-y-3">
                {result.found.map((f, i) => (
                  <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="font-medium">{f.pair.join(" + ")}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{f.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.medications?.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-[var(--muted)]">Medication info</h2>
              <div className="space-y-3">
                {result.medications.map((m, i) => (
                  <MedicationInfoCard key={`${m.name}-${i}`} medication={m} />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-[var(--muted)]">
            Interactions checked against a small curated list, not a full drug database. Medication
            info above is general educational information, not personalized medical advice — dosage
            shown is only what's printed on this label. Always confirm with a pharmacist or doctor.
          </p>
        </div>
      )}
    </main>
  );
}
