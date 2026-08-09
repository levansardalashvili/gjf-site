"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function GalleryForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    type: initial?.type || "photo",
    title: initial?.title || "",
    image_url: initial?.image_url || "",
    video_url: initial?.video_url || "",
    views: initial?.views || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) update("image_url", data.url);
    else setError(data.error || "ატვირთვა ვერ მოხერხდა");
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
      router.push("/admin/gallery");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტიპი</label>
        <select className={FIELD_CLASS} value={form.type} onChange={(e) => update("type", e.target.value)}>
          <option value="photo">ფოტო</option>
          <option value="video">ვიდეო</option>
        </select>
      </div>

      {form.type === "photo" ? (
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ფოტო</label>
          {form.image_url ? (
            <div className="relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-line">
                <Image src={form.image_url} alt="" fill className="object-cover" />
              </div>
              <button type="button" onClick={() => update("image_url", "")} className="mt-2 text-xs text-crimson font-semibold">
                წაშლა და სხვის ატვირთვა
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={uploading}
              onChange={handleImageChange}
              className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
            />
          )}
          {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
        </div>
      ) : (
        <>
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
        </>
      )}

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
