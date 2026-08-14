"use client";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

const FIELD_CLASS = "w-full bg-ink border border-line rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-gold";

export default function ContactForm() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const res = await fetch("/api/contact-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      const data = await res.json();
      setError(data.error || (lang === "en" ? "Something went wrong" : "შეცდომა მოხდა"));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-ink-2 border border-line rounded-2xl p-6 text-center">
        <p className="font-semibold text-gold">
          {lang === "en" ? "Thank you! Your message has been sent." : "მადლობა! შენი შეტყობინება გაიგზავნა."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-ink-2 border border-line rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="font-serif font-bold text-lg">
        {lang === "en" ? "Write to us" : "მოგვწერეთ"}
      </h3>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          {lang === "en" ? "Name" : "სახელი"}
        </label>
        <input className={FIELD_CLASS} value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={200} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          {lang === "en" ? "Email" : "ელფოსტა"}
        </label>
        <input type="email" className={FIELD_CLASS} value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={200} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide opacity-55 mb-1.5">
          {lang === "en" ? "Message" : "შეტყობინება"}
        </label>
        <textarea className={FIELD_CLASS} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} required maxLength={5000} />
      </div>

      {error && <p className="text-crimson text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-crimson rounded-lg py-2.5 font-bold text-sm disabled:opacity-50"
      >
        {status === "sending" ? (lang === "en" ? "Sending..." : "იგზავნება...") : (lang === "en" ? "Send" : "გაგზავნა")}
      </button>
    </form>
  );
}
