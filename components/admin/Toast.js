"use client";
import Icon from "@/components/Icon";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* toast popup — ეკრანის ზედა-მარჯვენა კუთხეში */}
      <div className="fixed top-5 right-5 z-[200] pointer-events-none">
        {toast && (
          <div
            key={toast.message + toast.type}
            className={`toast-pop pointer-events-auto flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl backdrop-blur-sm ${
              toast.type === "success"
                ? "bg-[#1d3a24]/95 border-[#3f8a52] text-[#c8f0d1]"
                : "bg-[#3a1d20]/95 border-crimson text-[#f5c8cc]"
            }`}
          >
            <Icon name={toast.type === "success" ? "check" : "close"} size={18} />
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
