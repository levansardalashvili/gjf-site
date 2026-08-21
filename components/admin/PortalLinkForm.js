"use client";
import { compressImage } from "@/lib/compressImage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import Image from "next/image";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function PortalLinkForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    url: initial?.url || "",
    logo_url: initial?.logo_url || "",
    logo_bg: initial?.logo_bg || "white",
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

  async function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", await compressImage(file));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) update("logo_url", data.url);
    else {
      setError(data.error || "ატვირთვა ვერ მოხერხდა");
      showToast(data.error || "ატვირთვა ვერ მოხერხდა", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/portal-links/${id}` : "/api/portal-links";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sort_order: Number(form.sort_order) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/portal-links");
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">აღწერა</label>
        <input className={FIELD_CLASS} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ბმული</label>
        <input className={FIELD_CLASS} placeholder="https://..." value={form.url} onChange={(e) => update("url", e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ლოგო</label>
        {form.logo_url ? (
          <div className="flex items-center gap-3">
            <div className="w-16 h-14 rounded-lg bg-white flex items-center justify-center p-2 border border-line">
              <div className="relative w-full h-full">
                <Image src={form.logo_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain" />
              </div>
            </div>
            <button type="button" onClick={() => update("logo_url", "")} className="text-xs text-crimson font-semibold">
              წაშლა და სხვის ატვირთვა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,.svg"
            disabled={uploading}
            onChange={handleLogoChange}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ლოგოს ფონი</label>
        <select className={FIELD_CLASS} value={form.logo_bg} onChange={(e) => update("logo_bg", e.target.value)}>
          <option value="white">თეთრი ბალიში</option>
          <option value="dark">მუქი (ღვინისფერი) ბალიში</option>
          <option value="none">გარეშე (გამჭვირვალე)</option>
        </select>
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
