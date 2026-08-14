"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkReadButton({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    await fetch(`/api/contact-messages/${id}`, { method: "PUT" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button onClick={handleClick} disabled={loading} className="text-gold font-semibold hover:opacity-80 disabled:opacity-40">
      {loading ? "..." : "წაკითხულად მონიშვნა"}
    </button>
  );
}
