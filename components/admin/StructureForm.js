"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function StructureForm({ initial, id, positions }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    label: initial?.label || "",
    person_name: initial?.person_name || "",
    node_type: initial?.node_type || "position",
    parent_id: initial?.parent_id || "",
    sort_order: initial?.sort_order ?? 100,
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
    const endpoint = isEdit ? `/api/structure/${id}` : "/api/structure";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        parent_id: form.parent_id ? Number(form.parent_id) : null,
        sort_order: Number(form.sort_order),
        person_name: form.person_name || null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/structure");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტიპი</label>
        <select className={FIELD_CLASS} value={form.node_type} onChange={(e) => update("node_type", e.target.value)}>
          <option value="position">მთავარი ჯაჭვის თანამდებობა (position)</option>
          <option value="branch">გვერდითი ბარათი (branch)</option>
        </select>
        <p className="text-xs opacity-45 mt-1.5">
          „position" — მთავარი ვერტიკალური ჯაჭვის რგოლი (მაგ. პრეზიდენტი). „branch" — გვერდითი ბარათი, ერთვის კონკრეტულ position-ს.
        </p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დასახელება</label>
        <input className={FIELD_CLASS} value={form.label} onChange={(e) => update("label", e.target.value)} required />
      </div>

      {form.node_type === "position" && (
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სახელი გვარი (არასავალდებულო)</label>
          <input className={FIELD_CLASS} value={form.person_name} onChange={(e) => update("person_name", e.target.value)} />
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          {form.node_type === "position" ? "წინა თანამდებობა ჯაჭვში (მშობელი)" : "ერთვის თანამდებობას"}
        </label>
        <select className={FIELD_CLASS} value={form.parent_id} onChange={(e) => update("parent_id", e.target.value)}>
          <option value="">— არცერთი (ძირი) —</option>
          {positions.map((p) => (
            <option key={p.id} value={p.id}>{p.label}{p.person_name ? ` — ${p.person_name}` : ""}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">თანმიმდევრობა</label>
        <input type="number" className={FIELD_CLASS} value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
