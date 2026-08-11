"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

const MONTHS_FULL = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
const MONTHS_SHORT = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

function formatDateRange(startISO, endISO) {
  if (!startISO) return "";
  const start = new Date(startISO + "T00:00:00");
  const end = endISO ? new Date(endISO + "T00:00:00") : null;

  const sd = start.getDate();
  const sm = start.getMonth();
  const sy = start.getFullYear();

  if (!end || startISO === endISO) {
    return `${sd} ${MONTHS_FULL[sm]} ${sy}`;
  }

  const ed = end.getDate();
  const em = end.getMonth();
  const ey = end.getFullYear();

  if (sy !== ey) return `${sd} ${MONTHS_FULL[sm]} ${sy} - ${ed} ${MONTHS_FULL[em]} ${ey}`;
  if (sm !== em) return `${sd} ${MONTHS_FULL[sm]} - ${ed} ${MONTHS_FULL[em]} ${sy}`;
  return `${sd}-${ed} ${MONTHS_FULL[sm]} ${sy}`;
}

export default function EventForm({ initial, id, defaultCategory }) {
  const isEdit = Boolean(id);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    day: initial?.day || "",
    month: initial?.month || "",
    date_range: initial?.date_range || "",
    tag: initial?.tag || (defaultCategory === "georgia" ? "ეროვნული" : "საერთაშორისო"),
    title: initial?.title || "",
    location: initial?.location || "",
    category: initial?.category || defaultCategory || "international",
    description: initial?.description || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // კატეგორიის მიხედვით ტეგი ავტომატურად
  useEffect(() => {
    update("tag", form.category === "georgia" ? "ეროვნული" : "საერთაშორისო");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.category]);

  // თარიღების არჩევისას day/month/date_range ავტომატურად გამოითვლება
  useEffect(() => {
    if (!startDate) return;
    const d = new Date(startDate + "T00:00:00");
    setForm((f) => ({
      ...f,
      day: String(d.getDate()),
      month: MONTHS_SHORT[d.getMonth()],
      date_range: formatDateRange(startDate, endDate || startDate),
    }));
  }, [startDate, endDate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const endpoint = isEdit ? `/api/events/${id}` : "/api/events";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push(`/admin/events/${form.category}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "შეცდომა შენახვისას");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">Slug (ლათინურად, უნიკალური)</label>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დაწყების თარიღი</label>
          <input
            type="date"
            className={FIELD_CLASS}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">დასრულების თარიღი</label>
          <input
            type="date"
            className={FIELD_CLASS}
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {form.date_range && (
        <p className="text-sm text-gold -mt-2">📅 {form.date_range}</p>
      )}
      {isEdit && !startDate && form.date_range && (
        <p className="text-xs opacity-50 -mt-2">
          ამჟამინდელი თარიღი: {form.date_range} — შესაცვლელად ზემოთ აირჩიე ახალი თარიღები.
        </p>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">სათაური</label>
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">ადგილმდებარეობა</label>
        <input className={FIELD_CLASS} value={form.location} onChange={(e) => update("location", e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">კატეგორია</label>
        <select className={FIELD_CLASS} value={form.category} onChange={(e) => update("category", e.target.value)}>
          <option value="international">საერთაშორისო</option>
          <option value="georgia">საქართველო</option>
        </select>
        <p className="text-xs opacity-45 mt-1.5">ტეგი ავტომატურად: {form.tag}</p>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">აღწერა</label>
        <textarea className={FIELD_CLASS} rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
