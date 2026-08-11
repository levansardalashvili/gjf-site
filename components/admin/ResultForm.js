"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function ResultForm({ initial, id, defaultCategory, defaultAgeGroup }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    category: initial?.category || defaultCategory || "georgia",
    age_group: initial?.age_group || defaultAgeGroup || "standart",
    event_name: initial?.event_name || "",
    event_date: initial?.event_date || "",
    source_url: initial?.source_url || "",
    file_url: initial?.file_url || "",
    file_name: initial?.file_name || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFileChange(e) {
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
      update("file_url", data.url);
      update("file_name", data.name);
    } else {
      setError(data.error || "ატვირთვა ვერ მოხერხდა");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/results/${id}` : "/api/results";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push(`/admin/results/${form.category}/${form.age_group}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კატეგორია</label>
          <select className={FIELD_CLASS} value={form.category} onChange={(e) => update("category", e.target.value)}>
            <option value="georgia">საქართველო</option>
            <option value="international">საერთაშორისო</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ასაკობრივი ჯგუფი</label>
          <select className={FIELD_CLASS} value={form.age_group} onChange={(e) => update("age_group", e.target.value)}>
            <option value="standart">უფროსები</option>
            <option value="youth">ახალგაზრდები</option>
            <option value="kids">ჭაბუკები</option>
            <option value="women">ქალები</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ღონისძიების დასახელება</label>
        <input className={FIELD_CLASS} value={form.event_name} onChange={(e) => update("event_name", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">თარიღი</label>
        <input className={FIELD_CLASS} value={form.event_date} onChange={(e) => update("event_date", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ბმული სრულ შედეგებზე (არასავალდებულო, მაგ. judomanager.com)
        </label>
        <input className={FIELD_CLASS} placeholder="https://..." value={form.source_url} onChange={(e) => update("source_url", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ან — PDF დანართი (თუ ბმულის ნაცვლად დოკუმენტი გაქვს)
        </label>
        {form.file_url ? (
          <div className="flex items-center justify-between bg-ink border border-line rounded-lg px-3.5 py-2.5">
            <a href={form.file_url} target="_blank" rel="noreferrer" className="text-sm text-gold truncate">
              📄 {form.file_name || "ატვირთული ფაილი"}
            </a>
            <button type="button" onClick={() => { update("file_url", ""); update("file_name", ""); }} className="text-xs text-crimson font-semibold ml-3 shrink-0">
              წაშლა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            disabled={uploading}
            onChange={handleFileChange}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
