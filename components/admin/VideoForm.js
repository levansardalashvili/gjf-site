"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function VideoForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    type: "video",
    title: initial?.title || "",
    video_url: initial?.video_url || "",
    views: initial?.views || "",
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
    const endpoint = isEdit ? `/api/gallery/${id}` : "/api/gallery";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/gallery/videos");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
      showToast(data.error || "შეცდომა შენახვისას", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ვიდეოს სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">YouTube ბმული</label>
        <input className={FIELD_CLASS} placeholder="https://youtube.com/..." value={form.video_url} onChange={(e) => update("video_url", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ნახვების რაოდენობა (არასავალდებულო)</label>
        <input className={FIELD_CLASS} placeholder="4.2k ნახვა" value={form.views} onChange={(e) => update("views", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
