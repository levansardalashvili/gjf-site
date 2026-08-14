"use client";
import { useEffect, useRef, useState } from "react";

// იღებს ტექსტს (მაგ. "14", "#2", "62"), პოულობს შიგნით რიცხვს და 0-დან ითვლის მასამდე,
// როცა ეკრანზე გამოჩნდება. არა-რიცხვითი სიმბოლოები (მაგ. "#") უცვლელად რჩება.
export default function AnimatedNumber({ value, duration = 1200 }) {
  const ref = useRef(null);
  // საწყისი მდგომარეობა — რეალური რიცხვი (არა "0"), რომ საძიებო სისტემებმა
  // და JavaScript-ის გარეშე ვიზიტორებმა ნამდვილი მონაცემი დაინახონ.
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : null;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice(match.index + match[0].length) : "";

  useEffect(() => {
    if (target === null) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setDisplay(`${prefix}0${suffix}`);
          const startTime = performance.now();
          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out
            const current = Math.round(eased * target);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}
