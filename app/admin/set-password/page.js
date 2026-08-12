"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import PasswordInput from "@/components/PasswordInput";
import Icon from "@/components/Icon";

const RULES = [
  { test: (p) => p.length >= 8, label: "მინიმუმ 8 სიმბოლო" },
  { test: (p) => /[A-Z]/.test(p), label: "მინიმუმ 1 დიდი ასო (A-Z)" },
  { test: (p) => /[0-9]/.test(p), label: "მინიმუმ 1 ციფრი" },
  { test: (p) => /[^A-Za-z0-9]/.test(p), label: "მინიმუმ 1 სპეციალური სიმბოლო (!@#$...)" },
  { test: (p) => p.length > 0 && /^[\x20-\x7E]*$/.test(p), label: "მხოლოდ ლათინური ასოები/ციფრები/სიმბოლოები" },
];

// ქართული (ან ნებისმიერი არა-ლათინური) სიმბოლოს აკრეფის მცდელობისას, ის უბრალოდ არ ჩაიწერება
function stripNonLatin(value) {
  return value.replace(/[^\x20-\x7E]/g, "");
}

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase-ის მოწვევის/აღდგენის ბმული URL-ში კოდს შეიცავს — ვცვლით session-ზე
    const supabase = createClient();
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    async function exchange() {
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      setReady(true);
    }
    exchange();
  }, []);

  const failedRules = RULES.filter((r) => !r.test(password));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (failedRules.length > 0) {
      setError("პაროლი არ აკმაყოფილებს ყველა მოთხოვნას — იხილე სია ქვემოთ");
      return;
    }
    if (password !== confirm) {
      setError("პაროლები არ ემთხვევა");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError("ვერ მოხერხდა პაროლის შენახვა — ბმული შეიძლება ვადაგასულია. სთხოვე ადმინისტრატორს ახალი მოწვევა.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink px-5">
        <p className="text-sm opacity-55">იტვირთება...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-ink-2 border border-line rounded-2xl p-7">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center mb-5">
          <Image src="/logo.png" alt="საქართველოს ძიუდოს ფედერაცია" width={99} height={125} className="w-10 h-auto" />
        </div>
        <h1 className="font-serif font-bold text-xl mb-1">დააყენე პაროლი</h1>
        <p className="text-sm opacity-55 mb-6">შექმენი პაროლი Admin პანელში შესასვლელად</p>

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">ახალი პაროლი</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(stripNonLatin(e.target.value))}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          autoFocus
          required
        />

        {/* პაროლის მოთხოვნების სია — ✓ მწვანედ, დანარჩენი ნაცრისფრად */}
        <ul className="mt-2.5 mb-4 space-y-1">
          {RULES.map((r) => {
            const ok = r.test(password);
            return (
              <li key={r.label} className={`text-xs flex items-center gap-1.5 ${ok ? "text-gold" : "opacity-45"}`}>
                <span>{ok ? <Icon name="check" size={12} className="inline" /> : "○"}</span>
                {r.label}
              </li>
            );
          })}
        </ul>

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">გაიმეორე პაროლი</label>
        <PasswordInput
          value={confirm}
          onChange={(e) => setConfirm(stripNonLatin(e.target.value))}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          required
        />
        {error && <p className="text-crimson text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-crimson rounded-lg py-2.5 font-bold text-sm mt-4 disabled:opacity-50"
        >
          {loading ? "..." : "შენახვა და შესვლა"}
        </button>
      </form>
    </div>
  );
}
