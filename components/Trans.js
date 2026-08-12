"use client";
import { useLanguage } from "@/lib/i18n";

// პატარა დამხმარე კომპონენტი — სერვერულ გვერდებშიც ჩასასმელად,
// რომ არ დაგვჭირდეს მთელი გვერდის კლიენტურ კომპონენტად გადაკეთება.
// გამოყენება: <Trans k="news" />
export default function Trans({ k }) {
  const { t } = useLanguage();
  return t(k);
}
