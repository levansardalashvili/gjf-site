"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// react-quill-new მხოლოდ ბრაუზერში მუშაობს (document/window სჭირდება),
// ამიტომ dynamic import-ით ვტვირთავთ, სერვერზე რენდერის გარეშე.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MODULES = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ color: [] }],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

export default function RichTextEditor({ value, onChange, placeholder }) {
  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={MODULES}
        placeholder={placeholder}
      />
    </div>
  );
}
