"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

// მრავალი ფოტოს ერთბაშად ატვირთვა კონკრეტულ ალბომში
export default function AlbumPhotoForm({ albumId }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  async function handleFilesChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      setProgress(`${i + 1} / ${files.length}`);
      const formData = new FormData();
      formData.append("file", files[i]);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (uploadRes.ok) {
        const saveRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "photo", image_url: uploadData.url, album_id: albumId }),
        });
        if (saveRes.ok) successCount++;
      }
    }

    setUploading(false);
    setProgress("");
    e.target.value = "";

    if (successCount > 0) {
      showToast(`დაემატა ${successCount} ფოტო`, "success");
      router.refresh();
    } else {
      showToast("ფოტოების ატვირთვა ვერ მოხერხდა", "error");
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={uploading}
        onChange={handleFilesChange}
        className="text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-crimson file:text-white file:text-sm file:font-semibold"
      />
      {uploading && <p className="text-xs opacity-55 mt-1.5">იტვირთება... {progress}</p>}
      <p className="text-xs opacity-45 mt-1.5">შეგიძლია ერთბაშად რამდენიმე ფოტო აირჩიო.</p>
    </div>
  );
}
