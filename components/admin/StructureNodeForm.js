"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function StructureNodeForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [nodeType, setNodeType] = useState(initial?.row_order ? "spine" : "branch");
  const [form, setForm] = useState({
    label: initial?.label || "",
    person_name: initial?.person_name || "",
    row_order: initial?.row_order ?? "",
    attach_to_row: initial?.attach_to_row ?? "",
    sort_order: initial?.sort_order ?? 100,
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

    const payload = {
      label: form.label,
      person_name: form.person_name || null,
      row_order: nodeType === "spine" ? Number(form.row_order) : null,
      attach_to_row: nodeType === "branch" ? Number(form.attach_to_row) : null,
      sort_order: Number(form.sort_order),
    };

    const endpoint = isEdit ? `/api/structure/${id}` : "/api/structure";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/structure");
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ტიპი</label>
        <select className={FIELD_CLASS} value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
          <option value="spine">მთავარი ხაზის რგოლი (მაგ. პრეზიდენტი)</option>
          <option value="branch">გვერდითი ყუთი (მაგ. კონკრეტული ფუნქცია)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დასახელება</label>
        <input className={FIELD_CLASS} value={form.label} onChange={(e) => update("label", e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          სახელი გვარი (არასავალდებულო — მხოლოდ მთავარ ხაზზეა საჭირო ჩვეულებრივ)
        </label>
        <input className={FIELD_CLASS} value={form.person_name} onChange={(e) => update("person_name", e.target.value)} />
      </div>

      {nodeType === "spine" ? (
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
            რიგითობა მთავარ ხაზზე (1 = ყველაზე ზემოთ)
          </label>
          <input type="number" className={FIELD_CLASS} value={form.row_order} onChange={(e) => update("row_order", e.target.value)} required />
        </div>
      ) : (
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
            მიემაგრება მთავარი ხაზის რომელ რიგითობას (row_order რიცხვი)
          </label>
          <input type="number" className={FIELD_CLASS} value={form.attach_to_row} onChange={(e) => update("attach_to_row", e.target.value)} required />
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          თანმიმდევრობა (ერთ row-ში რამდენიმე გვერდითი ყუთის შემთხვევაში)
        </label>
        <input type="number" className={FIELD_CLASS} value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
