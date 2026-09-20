import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "TriSentry AI — Early Warning Health Triage",
  description:
    "AI-assisted triage for symptoms, pregnancy danger signs, and medication interactions — grounded in public clinical criteria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="bg-[var(--red)]/10 border-b border-[var(--red)]/20 px-4 py-2 text-center text-sm text-[var(--red)]">
          This tool flags patterns worth urgent attention using public clinical criteria. It does
          not diagnose. <strong>In a real emergency, call emergency services immediately.</strong>
        </div>
        <header className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-3">
          <nav className="mx-auto flex max-w-4xl items-center justify-between">
            <Link href="/" className="font-bold rounded">
              TriSentry AI
            </Link>
            <div className="flex gap-5 text-sm text-[var(--muted)]">
              <Link href="/triage" className="rounded hover:text-[var(--ink)]">Symptom Triage</Link>
              <Link href="/maternal" className="rounded hover:text-[var(--ink)]">Maternal Screener</Link>
              <Link href="/medication" className="rounded hover:text-[var(--ink)]">Medication Check</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
