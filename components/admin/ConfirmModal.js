"use client";
import { useEffect } from "react";

import Icon from "@/components/Icon";

export default function ConfirmModal({ open, text, onConfirm, onCancel, loading }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm modal-fade" onClick={onCancel} />
      <div className="relative modal-pop bg-ink-2 border border-line rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="w-11 h-11 rounded-full bg-crimson/15 text-crimson flex items-center justify-center mb-4">
          <Icon name="warning" size={22} />
        </div>
        <h3 className="font-serif font-bold text-lg mb-2">დარწმუნებული ხარ?</h3>
        <p className="text-sm opacity-70 mb-6">{text}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-line text-sm font-semibold hover:bg-ink transition-colors"
          >
            გაუქმება
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-crimson text-sm font-bold hover:bg-crimson-dark transition-colors disabled:opacity-50"
          >
            {loading ? "იშლება..." : "წაშლა"}
          </button>
        </div>
      </div>
    </div>
  );
}
