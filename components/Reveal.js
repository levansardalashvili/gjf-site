"use client";
import { useEffect, useRef, useState } from "react";

// გვერდზე სქროლვისას სექციები/ბარათები ნელა "აცოცხდებიან".
// წმინდა CSS ანიმაცია + მსუბუქი IntersectionObserver — გარე ბიბლიოთეკის გარეშე.
export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal ${delayClass} ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
