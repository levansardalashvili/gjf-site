"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useToast } from "@/components/admin/Toast";

export default function AdminSecurityPage() {
  const [factors, setFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState("");
  const [factorId, setFactorId] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { showToast } = useToast();

  function loadFactors() {
    const supabase = createClient();
    supabase.auth.mfa.listFactors().then(({ data }) => {
      setFactors(data?.totp || []);
      setLoading(false);
    });
  }
  useEffect(loadFactors, []);

  async function startEnroll() {
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
    if (error) {
      setError("ჩართვა ვერ მოხერხდა — სცადე ხელახლა");
      return;
    }
    setFactorId(data.id);
    setQrCode(data.totp.qr_code);
    setSecret(data.totp.secret);
    setEnrolling(true);
  }

  async function confirmEnroll(e) {
    e.preventDefault();
    setVerifying(true);
    setError("");
    const supabase = createClient();
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setVerifying(false);
      setError("შეცდომა — სცადე ხელახლა");
      return;
    }
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.trim(),
    });
    setVerifying(false);
    if (verifyError) {
      setError("არასწორი კოდი — სცადე ხელახლა");
      return;
    }
    showToast("2FA წარმატებით ჩაირთო", "success");
    setEnrolling(false);
    setCode("");
    loadFactors();
  }

  async function handleRemove(id) {
    if (!confirm("გამოირთოს ორფაქტორიანი დადასტურება?")) return;
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
    if (error) {
      showToast("წაშლა ვერ მოხერხდა", "error");
      return;
    }
    showToast("2FA გამოირთო", "success");
    loadFactors();
  }

  if (loading) return <p className="opacity-50 text-sm">იტვირთება...</p>;

  const verifiedFactor = factors.find((f) => f.status === "verified");

  return (
    <div className="max-w-lg">
      <h1 className="font-serif font-bold text-2xl mb-2">უსაფრთხოება</h1>
      <p className="text-sm opacity-55 mb-6">
        ორფაქტორიანი დადასტურება (2FA) დამატებით უსაფრთხოებას მატებს — login-ისას პაროლის გარდა, დროებით კოდსაც მოგთხოვს ავთენტიფიკატორის აპლიკაციიდან (მაგ. Google Authenticator).
      </p>

      {verifiedFactor ? (
        <div className="bg-ink-2 border border-line rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" /> 2FA ჩართულია
              </div>
              <div className="text-xs opacity-55 mt-1">დამატებულია: {new Date(verifiedFactor.created_at).toLocaleDateString("ka-GE")}</div>
            </div>
            <button onClick={() => handleRemove(verifiedFactor.id)} className="text-sm text-crimson font-semibold">
              გამორთვა
            </button>
          </div>
        </div>
      ) : enrolling ? (
        <div className="bg-ink-2 border border-line rounded-2xl p-5">
          <p className="text-sm mb-4">
            დაასკანერე ეს კოდი Google Authenticator-ით (ან მსგავსი აპლიკაციით), მერე შეიყვანე დროებითი კოდი.
          </p>
          {qrCode && (
            <div className="bg-white p-3 rounded-lg inline-block mb-4">
              <img src={qrCode} alt="QR კოდი" width={180} height={180} />
            </div>
          )}
          <p className="text-xs opacity-50 mb-4 break-all">
            ან ხელით შეიყვანე: <span className="font-mono">{secret}</span>
          </p>
          <form onSubmit={confirmEnroll} className="flex flex-col gap-3">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-center text-xl tracking-[0.4em] outline-none focus:border-gold"
              autoFocus
              required
            />
            {error && <p className="text-crimson text-sm">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={verifying || code.length !== 6} className="bg-crimson rounded-lg py-2.5 px-5 font-bold text-sm disabled:opacity-50">
                {verifying ? "..." : "დადასტურება და ჩართვა"}
              </button>
              <button type="button" onClick={() => setEnrolling(false)} className="text-sm opacity-60">გაუქმება</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-ink-2 border border-line rounded-2xl p-5">
          <div className="font-semibold text-sm mb-3">2FA გამორთულია</div>
          {error && <p className="text-crimson text-sm mb-3">{error}</p>}
          <button onClick={startEnroll} className="bg-crimson rounded-lg py-2.5 px-5 font-bold text-sm">
            ჩართვა
          </button>
        </div>
      )}
    </div>
  );
}
