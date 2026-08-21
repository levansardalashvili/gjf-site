"use client";
import dynamic from "next/dynamic";
import { useRef, useEffect, useCallback, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

// react-quill-new მხოლოდ ბრაუზერში მუშაობს (document/window სჭირდება),
// ამიტომ dynamic import-ით ვტვირთავთ, სერვერზე რენდერის გარეშე.
// ⚠️ next/dynamic-ს default-ად არ გადააქვს `ref` დინამიურად ჩატვირთულ კომპონენტამდე —
// ამიტომ ხელით "ვახვევთ" ჩვეულებრივ prop-ად (forwardedRef), რომელსაც next/dynamic უკვე გადასცემს.
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    function QuillWithRef({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    }
    return QuillWithRef;
  },
  { ssr: false }
);

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
  const savedRangeRef = useRef(null);
  const savedQuillRef = useRef(null); // editor-ის თავად "ობიექტი" — არა React-ის ref, რომ
  // ფაილის ასარჩევი (ხანგრძლივი, native) ფანჯრის შემდეგაც საიმედოდ დაგვრჩეს
  const [uploadError, setUploadError] = useState("");

  const openFilePicker = useCallback(() => {
    const quill = quillRef.current?.getEditor();
    savedQuillRef.current = quill || null;
    const range = quill ? quill.getSelection(true) : null;
    savedRangeRef.current = range && range.length > 0 ? { ...range } : null;
    setUploadError("");
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // იგივე ფაილის ხელახლა არჩევის საშუალებისთვის
    if (!file) return;

    // ჯერ ვცდით უკვე შენახულ instance-ს (საიმედო), თუ არა — ხელახლა ვცდით ref-იდან
    const quill = savedQuillRef.current || quillRef.current?.getEditor();
    if (!quill) {
      setUploadError("რედაქტორი ვერ მოიძებნა — სცადე გვერდის განახლება");
      return;
    }

    const range = savedRangeRef.current;
    const hasSelectedText = Boolean(range && range.length > 0);
    const insertIndex = range ? range.index : quill.getLength();

    try {
      if (!hasSelectedText) {
        quill.insertText(insertIndex, "იტვირთება...", { italic: true }, "user");
      }

      const formData = new FormData();
      const uploadFile = file.type.startsWith("image/") ? await compressIfImage(file) : file;
      formData.append("file", uploadFile);

      const res = await fetch("/api/upload", { method: "POST", body: formData });

      if (!hasSelectedText) {
        quill.deleteText(insertIndex, "იტვირთება...".length, "user");
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setUploadError(errData.error || "ატვირთვა ვერ მოხერხდა");
        return;
      }

      const data = await res.json();

      if (file.type.startsWith("image/")) {
        quill.insertEmbed(insertIndex, "image", data.url, "user");
        quill.setSelection(insertIndex + 1, 0, "user");
      } else if (hasSelectedText) {
        // მონიშნული ტექსტი (მაგ. "დებულება") ბმულად გადაიქცევა — ახალი ტექსტი არ ემატება
        quill.formatText(range.index, range.length, "link", data.url, "user");
        quill.setSelection(range.index + range.length, 0, "user");
      } else {
        const label = data.name || file.name;
        quill.insertText(insertIndex, label, { link: data.url }, "user");
        quill.setSelection(insertIndex + label.length, 0, "user");
      }
    } catch (err) {
      setUploadError("მოულოდნელი შეცდომა ატვირთვისას — სცადე ხელახლა");
    } finally {
      savedRangeRef.current = null;
      savedQuillRef.current = null;
    }
  }, []);

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
        forwardedRef={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
      {uploadError && <p className="text-crimson text-xs mt-1.5">{uploadError}</p>}
    </div>
  );
}
