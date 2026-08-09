"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function NewsForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    date: initial?.date || "",
    title: initial?.title || "",
    medal: initial?.medal || "",
    featured: initial?.featured || false,
    excerpt: initial?.excerpt || "",
    body: initial?.body || "",
    image_url: initial?.image_url || "",
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

    if (res.ok) {
      update("image_url", data.url);
    } else {
      setError(data.error || "ატვირთვა ვერ მოხერხდა");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/news/${id}` : "/api/news";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, medal: form.medal || null }),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/news");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          Slug (ლათინურად, უნიკალური — URL-ისთვის)
        </label>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ფოტო <span className="text-crimson">(სავალდებულო — მთავარ გვერდზე carousel-ისთვის)</span>
        </label>

        {form.image_url ? (
          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-line">
              <Image src={form.image_url} alt="" fill className="object-cover" />
            </div>
            <button
              type="button"
              onClick={() => update("image_url", "")}
              className="mt-2 text-xs text-crimson font-semibold"
            >
              ფოტოს წაშლა და სხვის ატვირთვა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={uploading}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">თარიღი</label>
        <input className={FIELD_CLASS} placeholder="28 ივლისი 2026" value={form.date} onChange={(e) => update("date", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">მედალი (არასავალდებულო, მაგ. 🥇 ოქრო)</label>
        <input className={FIELD_CLASS} value={form.medal} onChange={(e) => update("medal", e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
        გამორჩეული (მთავარ გვერდზე დიდი ჩანს)
      </label>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">მოკლე აღწერა</label>
        <textarea className={FIELD_CLASS} rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სრული ტექსტი</label>
        <textarea className={FIELD_CLASS} rows={6} value={form.body} onChange={(e) => update("body", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
