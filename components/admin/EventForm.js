"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function EventForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    day: initial?.day || "",
    month: initial?.month || "",
    date_range: initial?.date_range || "",
    tag: initial?.tag || "",
    title: initial?.title || "",
    location: initial?.location || "",
    category: initial?.category || "international",
    description: initial?.description || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/events/${id}` : "/api/events";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/events");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">Slug (ლათინურად, უნიკალური)</label>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დღე (მაგ. 16)</label>
          <input className={FIELD_CLASS} value={form.day} onChange={(e) => update("day", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">თვე (მაგ. აპრ)</label>
          <input className={FIELD_CLASS} value={form.month} onChange={(e) => update("month", e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სრული თარიღის დიაპაზონი</label>
        <input className={FIELD_CLASS} placeholder="16-19 აპრილი 2026" value={form.date_range} onChange={(e) => update("date_range", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტეგი (მაგ. საერთაშორისო / გრან სლემი / ეროვნული)</label>
        <input className={FIELD_CLASS} value={form.tag} onChange={(e) => update("tag", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ადგილმდებარეობა</label>
        <input className={FIELD_CLASS} value={form.location} onChange={(e) => update("location", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კატეგორია</label>
        <select className={FIELD_CLASS} value={form.category} onChange={(e) => update("category", e.target.value)}>
          <option value="international">საერთაშორისო</option>
          <option value="georgia">საქართველო</option>
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">აღწერა</label>
        <textarea className={FIELD_CLASS} rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
