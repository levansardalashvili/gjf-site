"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function TeamMemberForm({ initial, id, defaultCategory }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    category: initial?.category || defaultCategory || "standart",
    weight: initial?.weight || "",
    name: initial?.name || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/team-members/${id}` : "/api/team-members";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">წონითი კატეგორია</label>
        <input className={FIELD_CLASS} placeholder="-73 კგ" value={form.weight} onChange={(e) => update("weight", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სახელი გვარი</label>
        <input className={FIELD_CLASS} value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
