"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";

export default function DeleteButton({ endpoint, confirmText = "ეს ჩანაწერი მუდმივად წაიშლება — ამის დაბრუნება შეუძლებელია." }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    setOpen(false);
    if (res.ok) {
      showToast("წაიშალა", "success");
      router.refresh();
    } else {
      showToast("წაშლა ვერ მოხერხდა", "error");
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm text-crimson font-semibold hover:underline">
        წაშლა
      </button>
      <ConfirmModal
        open={open}
        text={confirmText}
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
