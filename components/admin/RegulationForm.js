"use client";
import Icon from "@/components/Icon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function RegulationForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: initial?.title || "",
    excerpt: initial?.excerpt || "",
    file_url: initial?.file_url || "",
    file_name: initial?.file_name || "",
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
      showToast(data.error || "შეცდომა შენახვისას", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/regulations/${id}` : "/api/regulations";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sort_order: Number(form.sort_order) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/regulations");
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">მოკლე აღწერა</label>
        <textarea className={FIELD_CLASS} rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">PDF დოკუმენტი</label>
        {form.file_url ? (
          <div className="flex items-center justify-between bg-ink border border-line rounded-lg px-3.5 py-2.5">
            <a href={form.file_url} target="_blank" rel="noreferrer" className="text-sm text-gold truncate">
              <Icon name="document" size={15} className="inline mr-1" />
              {form.file_name || "ატვირთული ფაილი"}
            </a>
            <button type="button" onClick={() => { update("file_url", ""); update("file_name", ""); }} className="text-xs text-crimson font-semibold ml-3 shrink-0">
              წაშლა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.rtf,.zip"
            disabled={uploading}
            onChange={handleFileChange}
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
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
