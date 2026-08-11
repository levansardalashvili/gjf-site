"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან");
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
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center font-black mb-5">ჯ</div>
        <h1 className="font-serif font-bold text-xl mb-1">დააყენე პაროლი</h1>
        <p className="text-sm opacity-55 mb-6">შექმენი პაროლი Admin პანელში შესასვლელად</p>

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">ახალი პაროლი</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm mb-4 outline-none focus:border-gold"
          autoFocus
          required
        />

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">გაიმეორე პაროლი</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm mb-2 outline-none focus:border-gold"
          required
        />
        {error && <p className="text-crimson text-sm mb-2">{error}</p>}

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
