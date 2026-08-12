"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function SocialLinkForm({ initial, id, onDone }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    platform: initial?.platform || "facebook",
    url: initial?.url || "",
    sort_order: initial?.sort_order ?? 100,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/social-links/${id}` : "/api/social-links";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sort_order: Number(form.sort_order) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.refresh();
      onDone?.();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
      showToast(data.error || "შეცდომა შენახვისას", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">პლატფორმა</label>
        <select className={FIELD_CLASS} value={form.platform} onChange={(e) => update("platform", e.target.value)}>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ბმული</label>
        <input className={FIELD_CLASS} placeholder="https://..." value={form.url} onChange={(e) => update("url", e.target.value)} required />
      </div>
      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 px-5 font-bold text-sm disabled:opacity-50 whitespace-nowrap">
        {saving ? "..." : isEdit ? "განახლება" : "დამატება"}
      </button>
      {error && <p className="text-crimson text-sm">{error}</p>}
    </form>
  );
}
