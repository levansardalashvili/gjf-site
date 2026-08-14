"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

const COLUMNS = [
  { group: "ოლიმპიადა", key: "olympic" },
  { group: "მსოფლიოს ჩემპიონატი", key: "world" },
  { group: "ევროპის ჩემპიონატი", key: "european" },
];
const MEDALS = [
  { key: "gold", label: "ოქრო" },
  { key: "silver", label: "ვერცხლი" },
  { key: "bronze", label: "ბრინჯაო" },
];

export default function MedalRecordForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    athlete_name: initial?.athlete_name || "",
    olympic_gold: initial?.olympic_gold || "",
    olympic_silver: initial?.olympic_silver || "",
    olympic_bronze: initial?.olympic_bronze || "",
    world_gold: initial?.world_gold || "",
    world_silver: initial?.world_silver || "",
    world_bronze: initial?.world_bronze || "",
    european_gold: initial?.european_gold || "",
    european_silver: initial?.european_silver || "",
    european_bronze: initial?.european_bronze || "",
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
    const endpoint = isEdit ? `/api/medal-records/${id}` : "/api/medal-records";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sort_order: Number(form.sort_order) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/medal-records");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
      showToast(data.error || "შეცდომა შენახვისას", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სპორტსმენის სახელი</label>
        <input className={FIELD_CLASS} value={form.athlete_name} onChange={(e) => update("athlete_name", e.target.value)} required />
      </div>

      {COLUMNS.map((col) => (
        <div key={col.key} className="bg-ink-2 border border-line rounded-xl p-4">
          <div className="font-serif font-bold text-sm mb-3">{col.group}</div>
          <div className="grid grid-cols-3 gap-3">
            {MEDALS.map((m) => {
              const fieldKey = `${col.key}_${m.key}`;
              return (
                <div key={fieldKey}>
                  <label className="block text-xs opacity-55 mb-1">{m.label}</label>
                  <input
                    className={FIELD_CLASS}
                    placeholder="2021, 2024"
                    value={form[fieldKey]}
                    onChange={(e) => update(fieldKey, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="text-xs opacity-45 -mt-2">წლები მძიმით გამოყოფილი ჩაწერე, თუ რამდენჯერმეა მოგებული (მაგ. "2021, 2024").</p>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">თანმიმდევრობა</label>
        <input type="number" className={FIELD_CLASS + " max-w-[140px]"} value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50 max-w-xs">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
