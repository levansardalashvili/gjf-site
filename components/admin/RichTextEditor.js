"use client";
import dynamic from "next/dynamic";
import { useRef, useEffect, useCallback } from "react";
import "react-quill-new/dist/quill.snow.css";

// react-quill-new მხოლოდ ბრაუზერში მუშაობს (document/window სჭირდება),
// ამიტომ dynamic import-ით ვტვირთავთ, სერვერზე რენდერის გარეშე.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ატვირთვამდე რამდენიმე ფოტოს შემცირება (თუ სურათია) — იმავე წესით, რასაც სხვაგანაც ვიყენებთ
async function compressIfImage(file) {
  const { compressImage } = await import("@/lib/compressImage");
  return compressImage(file);
}

const FILE_ICON_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.5V7a2 2 0 0 0-2-2h-6L11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="M16 21l5-5M16 16h5v5"/></svg>';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(
    async (e) => {
      const file = e.target.files[0];
      e.target.value = ""; // იგივე ფაილის ხელახლა არჩევის საშუალებისთვის
      if (!file) return;

      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      const range = quill.getSelection(true);
      const insertIndex = range ? range.index : quill.getLength();

      quill.insertText(insertIndex, "იტვირთება...", { italic: true });

      const formData = new FormData();
      formData.append("file", file.type.startsWith("image/") ? await compressIfImage(file) : file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      quill.deleteText(insertIndex, "იტვირთება...".length);

      if (!res.ok) {
        quill.insertText(insertIndex, "[ატვირთვის შეცდომა]");
        return;
      }

      if (file.type.startsWith("image/")) {
        quill.insertEmbed(insertIndex, "image", data.url, "user");
        quill.setSelection(insertIndex + 1);
      } else {
        const label = data.name || file.name;
        quill.insertText(insertIndex, label, { link: data.url }, "user");
        quill.setSelection(insertIndex + label.length);
      }
    },
    []
  );

  // Quill-ს არ ესმის "file"-ის ტიპის ღილაკის იკონა ჩაშენებულად — ხელით ვუმატებთ,
  // toolbar-ის DOM-ში მოძებნის შემდეგ.
  useEffect(() => {
    const buttons = document.querySelectorAll(".rich-text-editor .ql-file");
    buttons.forEach((btn) => {
      if (!btn.innerHTML.includes("svg")) {
        btn.innerHTML = FILE_ICON_SVG;
        btn.title = "ფაილის მიმაგრება";
      }
    });
  });

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ color: [] }],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["file"],
        ["clean"],
      ],
      handlers: { file: openFilePicker },
    },
  };

  return (
    <div className="rich-text-editor">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.rtf,.zip,image/jpeg,image/png,image/webp"
        onChange={handleFileSelected}
        className="hidden"
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
