"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ endpoint, confirmText = "წავშალო?" }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(confirmText)) return;
    const res = await fetch(endpoint, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("წაშლა ვერ მოხერხდა");
  }

  return (
    <button onClick={handleDelete} className="text-sm text-crimson font-semibold hover:underline">
      წაშლა
    </button>
  );
}
