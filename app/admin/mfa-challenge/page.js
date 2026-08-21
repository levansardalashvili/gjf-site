"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function MfaChallengePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [factorId, setFactorId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.mfa.listFactors().then(({ data }) => {
      const verified = data?.totp?.find((f) => f.status === "verified");
      if (verified) setFactorId(verified.id);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!factorId) return;
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setLoading(false);
      setError("შეცდომა — სცადე ხელახლა");
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.trim(),
    });

    setLoading(false);
    if (verifyError) {
      setError("არასწორი კოდი — სცადე ხელახლა");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-ink-2 border border-line rounded-2xl p-7">
        <h1 className="font-serif font-bold text-xl mb-1">ორფაქტორიანი დადასტურება</h1>
        <p className="text-sm opacity-55 mb-6">შეიყვანე 6-ციფრიანი კოდი შენი ავთენტიფიკატორის აპლიკაციიდან.</p>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-gold"
          autoFocus
          required
        />
        {error && <p className="text-crimson text-sm mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading || code.length !== 6 || !factorId}
          className="w-full bg-crimson rounded-lg py-2.5 font-bold text-sm mt-5 disabled:opacity-50"
        >
          {loading ? "..." : "დადასტურება"}
        </button>
      </form>
    </div>
  );
}
