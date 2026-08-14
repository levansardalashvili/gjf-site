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

const MONTHS_FULL = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];

export default function NewsForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [slugTouched, setSlugTouched] = useState(isEdit); // edit-ისას ავტომატურად აღარ გადავაწერთ slug-ს
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    date: initial?.date || "",
    title: initial?.title || "",
    title_en: initial?.title_en || "",
    image_url: initial?.image_url || "",
    body: initial?.body || "",
    body_en: initial?.body_en || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  function handleDateChange(isoDate) {
    if (!isoDate) return;
    const d = new Date(isoDate + "T00:00:00");
    update("date", `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`);
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
      showToast(data.error || "ატვირთვა ვერ მოხერხდა", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.image_url) {
      setError("ფოტოს ატვირთვა სავალდებულოა");
      showToast("ფოტოს ატვირთვა სავალდებულოა", "error");
      return;
    }

    setSaving(true);
    const endpoint = isEdit ? `/api/news/${id}` : "/api/news";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/news");
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
          სათაური <span className="text-gold">(ქართული)</span>
        </label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">
            სათაური <span className="text-gold">(ინგლისური — არასავალდებულო, ცარიელობისას ქართული გამოჩნდება)</span>
          </label>
          <TranslateButton sourceText={form.title} onTranslated={(text) => update("title_en", text)} />
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          ფოტო <span className="text-crimson">(სავალდებულო — მთავარ გვერდზე carousel-ისთვის)</span>
        </label>

        {form.image_url ? (
          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-line">
              <Image src={form.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
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
        <input
          type="date"
          className={FIELD_CLASS}
          onChange={(e) => handleDateChange(e.target.value)}
          required
        />
        {form.date && <p className="text-sm text-gold mt-1.5"><Icon name="calendar" size={14} className="inline mr-1" />{form.date}</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          სრული ტექსტი <span className="text-gold">(ქართული)</span>
        </label>
        <RichTextEditor value={form.body} onChange={(html) => update("body", html)} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">
            სრული ტექსტი <span className="text-gold">(ინგლისური — არასავალდებულო)</span>
          </label>
          <TranslateButton sourceText={form.body} onTranslated={(text) => update("body_en", text)} />
        </div>
        <RichTextEditor value={form.body_en} onChange={(html) => update("body_en", html)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
