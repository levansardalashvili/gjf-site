"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import PasswordInput from "@/components/PasswordInput";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      setError("არასწორი ელფოსტა ან პაროლი");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-ink-2 border border-line rounded-2xl p-7">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center mb-5">
          <Image src="/logo.png" alt="საქართველოს ძიუდოს ფედერაცია" width={99} height={125} className="w-10 h-auto" />
        </div>
        <h1 className="font-serif font-bold text-xl mb-1">Admin შესვლა</h1>
        <p className="text-sm opacity-55 mb-6">საქართველოს ძიუდოს ფედერაცია</p>

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">ელფოსტა</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm mb-4 outline-none focus:border-gold"
          autoFocus
          required
        />

        <label className="block text-xs uppercase tracking-wide opacity-55 mb-2">პაროლი</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          required
        />
        {error && <p className="text-crimson text-sm mt-2 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-crimson rounded-lg py-2.5 font-bold text-sm mt-4 disabled:opacity-50"
        >
          {loading ? "..." : "შესვლა"}
        </button>
      </form>
    </div>
  );
}
