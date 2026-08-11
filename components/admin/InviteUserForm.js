"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InviteUserForm() {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setSaving(false);

    if (res.ok) {
      setSuccess(`მოწვევა გაიგზავნა: ${email}`);
      setEmail("");
      router.refresh();
    } else {
      setError(data.error || "შეცდომა მოწვევისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="თანამშრომლის ელფოსტა"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold"
          required
        />
        <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 px-5 font-bold text-sm disabled:opacity-50 whitespace-nowrap">
          {saving ? "იგზავნება..." : "მოწვევა"}
        </button>
      </div>
      {error && <p className="text-crimson text-sm mt-2">{error}</p>}
      {success && <p className="text-gold text-sm mt-2">{success}</p>}
    </form>
  );
}
