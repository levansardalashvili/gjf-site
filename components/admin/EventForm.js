"use client";
import Icon from "@/components/Icon";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import { slugify } from "@/lib/slugify";
import TranslateButton from "./TranslateButton";
import RichTextEditor from "./RichTextEditor";

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
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [startDate, setStartDate] = useState(initial?.event_date || "");
  const [endDate, setEndDate] = useState("");
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    day: initial?.day || "",
    month: initial?.month || "",
    date_range: initial?.date_range || "",
    event_date: initial?.event_date || "",
    tag: initial?.tag || (defaultCategory === "georgia" ? "ეროვნული" : "საერთაშორისო"),
    title: initial?.title || "",
    location: initial?.location || "",
    category: initial?.category || defaultCategory || "international",
    description: initial?.description || "",
    description_en: initial?.description_en || "",
    is_main_event: initial?.is_main_event || false,
  });
  const [saving, setSaving] = useState(false);
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

  // კატეგორიის მიხედვით ტეგი ავტომატურად
  useEffect(() => {
    update("tag", form.category === "georgia" ? "ეროვნული" : "საერთაშორისო");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.category]);

  // თარიღების არჩევისას day/month/date_range ავტომატურად გამოითვლება.
  // რედაქტირებისას, პირველივე ჩატვირთვაზე კი ეს არ ვამოქმედებთ — თორემ
  // არსებული, სწორი (მაგ. მრავალდღიანი) date_range ავტომატურად გადაიწერებოდა.
  const skipFirstRun = useRef(isEdit);
  useEffect(() => {
    if (skipFirstRun.current) {
      skipFirstRun.current = false;
      return;
    }
    if (!startDate) return;
    const d = new Date(startDate + "T00:00:00");
    setForm((f) => ({
      ...f,
      day: String(d.getDate()),
      month: MONTHS_SHORT[d.getMonth()],
      date_range: formatDateRange(startDate, endDate || startDate),
      event_date: startDate,
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
      showToast("წარმატებით შესრულდა — ცვლილებები დამახსოვრებულია", "success");
      router.push(`/admin/events/${form.category}`);
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
        <input className={FIELD_CLASS} value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          Slug (ავტომატურად გენერირდება სათაურიდან — სურვილისამებრ ხელითაც შეგიძლია შეცვალო)
        </label>
        <input className={FIELD_CLASS} value={form.slug} onChange={(e) => handleSlugChange(e.target.value)} required />
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
        <p className="text-sm text-gold -mt-2"><Icon name="calendar" size={14} className="inline mr-1" />{form.date_range}</p>
      )}
      {isEdit && !startDate && form.date_range && (
        <p className="text-xs opacity-50 -mt-2">
          ამჟამინდელი თარიღი: {form.date_range} — შესაცვლელად ზემოთ აირჩიე ახალი თარიღები.
        </p>
      )}

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
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">აღწერა <span className="text-gold">(ქართული)</span></label>
        <RichTextEditor value={form.description} onChange={(html) => update("description", html)} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs uppercase tracking-wide opacity-55">აღწერა <span className="text-gold">(ინგლისური — არასავალდებულო)</span></label>
          <TranslateButton sourceText={form.description} onTranslated={(t) => update("description_en", t)} />
        </div>
        <RichTextEditor value={form.description_en} onChange={(html) => update("description_en", html)} />
      </div>

      <label className="flex items-center gap-2.5 text-sm bg-ink border border-line rounded-lg px-3.5 py-3">
        <input
          type="checkbox"
          checked={form.is_main_event}
          onChange={(e) => update("is_main_event", e.target.checked)}
        />
        <span>
          <span className="font-semibold">მთავარი ღონისძიება</span>
          <span className="block text-xs opacity-55">მთავარ გვერდზე, "მთავარი ღონისძიებები" პანელში გამოჩნდება</span>
        </span>
      </label>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button type="submit" disabled={saving} className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50">
        {saving ? "შენახვა..." : isEdit ? "განახლება" : "დამატება"}
      </button>
    </form>
  );
}
