"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import Image from "next/image";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function AlbumForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: initial?.title || "",
    cover_image_url: initial?.cover_image_url || "",
    sort_order: initial?.sort_order ?? 100,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) update("cover_image_url", data.url);
    else {
      setError(data.error || "ატვირთვა ვერ მოხერხდა");
      showToast(data.error || "ატვირთვა ვერ მოხერხდა", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.cover_image_url) {
      setError("ქავერის ფოტოს ატვირთვა სავალდებულოა");
      showToast("ქავერის ფოტოს ატვირთვა სავალდებულოა", "error");
      return;
    }
    setSaving(true);
    const endpoint = isEdit ? `/api/gallery-albums/${id}` : "/api/gallery-albums";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sort_order: Number(form.sort_order) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      const data = await res.json();
      router.push(isEdit ? "/admin/gallery/albums" : `/admin/gallery/albums/${data.id}/photos`);
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ალბომის სახელი (მაგ. „ევროპის ჩემპიონატი 2026")
        </label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ქავერის ფოტო <span className="text-crimson">(სავალდებულო)</span>
        </label>
        {form.cover_image_url ? (
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-line">
              <Image src={form.cover_image_url} alt="" fill className="object-cover" />
            </div>
            <button type="button" onClick={() => update("cover_image_url", "")} className="mt-2 text-xs text-crimson font-semibold">
              წაშლა და სხვის ატვირთვა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={handleCoverChange}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          თანმიმდევრობა (პატარა რიცხვი = უფრო წინ ჩანს)
        </label>
        <input type="number" className={FIELD_CLASS} value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "შექმნა და ფოტოების დამატება →"}
      </button>
    </form>
  );
}
