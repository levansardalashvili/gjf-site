"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useLanguage } from "@/lib/i18n";

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate + "T00:00:00").getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function EventCountdown({ event }) {
  const { lang } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(event.event_date));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(event.event_date)), 60000);
    return () => clearInterval(timer);
  }, [event.event_date]);

  if (!timeLeft) return null;

  const label = lang === "en" ? "Next event" : "შემდეგი ღონისძიება";
  const daysLabel = lang === "en" ? "d" : "დღე";
  const hoursLabel = lang === "en" ? "h" : "სთ";
  const minsLabel = lang === "en" ? "m" : "წთ";

  return (
    <Link
      href={`/calendar/${event.slug}`}
      className="group flex items-center gap-4 bg-ink-2 border border-line rounded-2xl px-5 py-4 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-crimson/10 text-crimson flex items-center justify-center shrink-0">
        <Icon name="calendar" size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[0.68rem] uppercase tracking-wide opacity-50 font-bold">{label}</div>
        <div className="font-serif font-bold text-sm truncate group-hover:text-gold transition-colors">{event.title}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0 font-mono text-sm font-bold text-crimson">
        {timeLeft.days > 0 && <span>{timeLeft.days}{daysLabel}</span>}
        <span>{timeLeft.hours}{hoursLabel}</span>
        <span className="opacity-60 font-normal">{timeLeft.minutes}{minsLabel}</span>
      </div>
    </Link>
  );
}
