"use client";
import { useEffect, useRef, useState } from "react";

// გვერდზე სქროლვისას სექციები/ბარათები ნელა "აცოცხდებიან".
// წმინდა CSS ანიმაცია + მსუბუქი IntersectionObserver — გარე ბიბლიოთეკის გარეშე.
export default function Reveal({ children, className = "", delay = 0, variant = "up" }) {
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
  const variantClass = variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : "";

  return (
    <div ref={ref} className={`reveal ${variantClass} ${delayClass} ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
