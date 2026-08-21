"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function LiveBroadcastForm({ initial }) {
  const [form, setForm] = useState({
    is_live: initial?.is_live || false,
    tournament_name: initial?.tournament_name || "",
    youtube_url: initial?.youtube_url || "",
    photo_url: initial?.photo_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", await compressImage(file));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) update("photo_url", data.url);
    else setError(data.error || "ატვირთვა ვერ მოხერხდა");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/live-broadcast", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      showToast("განახლდა", "success");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-4">
      <label className="flex items-center gap-3 bg-ink-2 border border-line rounded-xl p-4 cursor-pointer">
        <input type="checkbox" checked={form.is_live} onChange={(e) => update("is_live", e.target.checked)} className="w-5 h-5 accent-crimson" />
        <span className="font-semibold text-sm">
          {form.is_live ? "🔴 ლაივი ახლა მიმდინარეობს" : "ლაივი გამორთულია"}
        </span>
      </label>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტურნირის სახელი</label>
        <input className={FIELD_CLASS} value={form.tournament_name} onChange={(e) => update("tournament_name", e.target.value)} placeholder="მაგ. ევროპის ჩემპიონატი 2026" />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">YouTube ლაივის ბმული</label>
        <input className={FIELD_CLASS} value={form.youtube_url} onChange={(e) => update("youtube_url", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ლაივის ფოტო (ერთხელ ატვირთე, ყოველთვის იგივე გამოიყენება)</label>
        {form.photo_url ? (
          <div>
            <img src={form.photo_url} alt="" className="w-full aspect-video object-cover rounded-lg border border-line" />
            <button type="button" onClick={() => update("photo_url", "")} className="mt-2 text-xs text-crimson font-semibold">ფოტოს შეცვლა</button>
          </div>
        ) : (
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} disabled={uploading}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold" />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : "შენახვა"}
      </button>
    </form>
  );
}
