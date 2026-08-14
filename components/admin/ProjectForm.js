"use client";
import Icon from "@/components/Icon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import { slugify } from "@/lib/slugify";
import Image from "next/image";
import TranslateButton from "./TranslateButton";
import RichTextEditor from "./RichTextEditor";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function ProjectForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    title: initial?.title || "",
    title_en: initial?.title_en || "",
    excerpt: initial?.excerpt || "",
    excerpt_en: initial?.excerpt_en || "",
    body: initial?.body || "",
    body_en: initial?.body_en || "",
    image_url: initial?.image_url || "",
    file_url: initial?.file_url || "",
    file_name: initial?.file_name || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleTitleChange(value) {
    update("title", value);
    if (!slugTouched) update("slug", slugify(value));
  }

  function handleSlugChange(value) {
    setSlugTouched(true);
    update("slug", value);
  }

  async function uploadTo(file, onDone, setUploading) {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) onDone(data);
    else setError(data.error || "ატვირთვა ვერ მოხერხდა");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/projects/${id}` : "/api/projects";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/projects");
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური <span className="text-gold">(ქართული)</span></label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">სათაური <span className="text-gold">(ინგლისური — არასავალდებულო)</span></label>
          <TranslateButton sourceText={form.title} onTranslated={(t) => update("title_en", t)} />
        </div>
        <input className={FIELD_CLASS} value={form.title_en} onChange={(e) => update("title_en", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          Slug (ავტომატურად გენერირდება სათაურიდან — სურვილისამებრ ხელითაც შეგიძლია შეცვალო)
        </label>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => handleSlugChange(e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ფოტო (არასავალდებულო)</label>
        {form.image_url ? (
          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-line">
              <Image src={form.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
            </div>
            <button type="button" onClick={() => update("image_url", "")} className="mt-2 text-xs text-crimson font-semibold">
              ფოტოს წაშლა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploadingImage}
            onChange={(e) => e.target.files[0] && uploadTo(e.target.files[0], (d) => update("image_url", d.url), setUploadingImage)}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploadingImage && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დანართი PDF (არასავალდებულო)</label>
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
            disabled={uploadingFile}
            onChange={(e) => e.target.files[0] && uploadTo(e.target.files[0], (d) => { update("file_url", d.url); update("file_name", d.name); }, setUploadingFile)}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploadingFile && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">მოკლე აღწერა <span className="text-gold">(ქართული — ბარათებზე ჩანს)</span></label>
        <textarea className={FIELD_CLASS} rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">მოკლე აღწერა <span className="text-gold">(ინგლისური — არასავალდებულო)</span></label>
          <TranslateButton sourceText={form.excerpt} onTranslated={(t) => update("excerpt_en", t)} />
        </div>
        <textarea className={FIELD_CLASS} rows={2} value={form.excerpt_en} onChange={(e) => update("excerpt_en", e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სრული ტექსტი <span className="text-gold">(ქართული)</span></label>
        <RichTextEditor value={form.body} onChange={(html) => update("body", html)} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">სრული ტექსტი <span className="text-gold">(ინგლისური — არასავალდებულო)</span></label>
          <TranslateButton sourceText={form.body} onTranslated={(t) => update("body_en", t)} />
        </div>
        <RichTextEditor value={form.body_en} onChange={(html) => update("body_en", html)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploadingImage || uploadingFile} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
