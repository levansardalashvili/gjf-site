"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import { slugify } from "@/lib/slugify";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function TeamMemberForm({ initial, id, defaultCategory }) {
  const isEdit = Boolean(id);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [form, setForm] = useState({
    category: initial?.category || defaultCategory || "standart",
    weight: initial?.weight || "",
    name: initial?.name || "",
    slug: initial?.slug || "",
    photo_url: initial?.photo_url || "",
    birth_year: initial?.birth_year || "",
    club: initial?.club || "",
    bio: initial?.bio || "",
    achievements: initial?.achievements || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleNameChange(value) {
    update("name", value);
    if (!slugTouched) update("slug", slugify(value));
  }

  function handleSlugChange(value) {
    setSlugTouched(true);
    update("slug", value);
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (res.ok) update("photo_url", data.url);
    else {
      setError(data.error || "ატვირთვა ვერ მოხერხდა");
      showToast(data.error || "ატვირთვა ვერ მოხერხდა", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/team-members/${id}` : "/api/team-members";
    const method = isEdit ? "PUT" : "POST";
    const payload = { ...form, birth_year: form.birth_year ? Number(form.birth_year) : null };
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push(`/admin/team-members/${form.category}`);
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კატეგორია</label>
        <select className={FIELD_CLASS} value={form.category} onChange={(e) => update("category", e.target.value)}>
          <option value="standart">უფროსები</option>
          <option value="youth">ახალგაზრდები</option>
          <option value="kids">ჭაბუკები</option>
          <option value="women">ქალები</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ფოტო (არასავალდებულო)</label>
        {form.photo_url ? (
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-line shrink-0">
              <Image src={form.photo_url} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <button type="button" onClick={() => update("photo_url", "")} className="text-xs text-crimson font-semibold">
              წაშლა და სხვის ატვირთვა
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={handlePhotoChange}
            className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
          />
        )}
        {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება...</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სახელი გვარი</label>
        <input className={FIELD_CLASS} value={form.name} onChange={(e) => handleNameChange(e.target.value)} required />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">
            Slug (ავტომატურად გენერირდება სახელიდან — სურვილისამებრ ხელითაც შეგიძლია შეცვალო)
          </label>
          <button
            type="button"
            onClick={() => handleSlugChange(slugify(form.name))}
            className="text-xs font-semibold text-gold hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            ხელახლა გენერირება
          </button>
        </div>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => handleSlugChange(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">წონითი კატეგორია</label>
          <input className={FIELD_CLASS} placeholder="-73 კგ" value={form.weight} onChange={(e) => update("weight", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დაბადების წელი (არასავალდებულო)</label>
          <input type="number" className={FIELD_CLASS} placeholder="2001" value={form.birth_year} onChange={(e) => update("birth_year", e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კლუბი (არასავალდებულო)</label>
        <input className={FIELD_CLASS} value={form.club} onChange={(e) => update("club", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">მოკლე ბიოგრაფია (არასავალდებულო)</label>
        <RichTextEditor value={form.bio} onChange={(html) => update("bio", html)} placeholder="სპორტსმენის მოკლე ბიოგრაფია..." />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          მიღწევები (არასავალდებულო — თითო ხაზზე თითო მიღწევა)
        </label>
        <textarea
          className={FIELD_CLASS}
          rows={5}
          placeholder={"ევროპის ჩემპიონი, 2024\nსაქართველოს ჩემპიონი, 2023"}
          value={form.achievements}
          onChange={(e) => update("achievements", e.target.value)}
        />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving || uploading} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
