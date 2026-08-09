"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function PageForm({ initial, id }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    body: initial?.body || "",
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

  function removeFile() {
    update("file_url", "");
    update("file_name", "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/pages");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტექსტი</label>
        <textarea className={FIELD_CLASS} rows={12} value={form.body} onChange={(e) => update("body", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          დანართი (PDF — არასავალდებულო, მაგ. წესდების დოკუმენტი)
        </label>

        {form.file_url ? (
          <div className="flex items-center justify-between bg-ink border border-line rounded-lg px-3.5 py-2.5">
            <a href={form.file_url} target="_blank" rel="noreferrer" className="text-sm text-gold truncate">
              📄 {form.file_name || "ატვირთული ფაილი"}
            </a>
            <button type="button" onClick={removeFile} className="text-xs text-crimson font-semibold ml-3 shrink-0">
              წაშლა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50 w-fit px-6"
      >
        {saving ? "შენახვა..." : "განახლება"}
      </button>
    </form>
  );
}
