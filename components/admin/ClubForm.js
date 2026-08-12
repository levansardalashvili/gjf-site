"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function ClubForm({ initial, id }) {
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    location: initial?.location || "",
    region: initial?.region || "",
    members: initial?.members || 0,
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
    const endpoint = isEdit ? `/api/clubs/${id}` : "/api/clubs";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, members: Number(form.members) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push("/admin/clubs");
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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კლუბის სახელი</label>
        <input className={FIELD_CLASS} value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ადგილმდებარეობა</label>
        <input className={FIELD_CLASS} placeholder="თბილისი, საბურთალო" value={form.location} onChange={(e) => update("location", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">რეგიონი</label>
        <input className={FIELD_CLASS} placeholder="თბილისი" value={form.region} onChange={(e) => update("region", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">წევრების რაოდენობა</label>
        <input type="number" className={FIELD_CLASS} value={form.members} onChange={(e) => update("members", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
