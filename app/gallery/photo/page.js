import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getGalleryByType } from "@/lib/queries";

export const revalidate = 0;

export default async function GalleryPhotoPage() {
  const photos = await getGalleryByType("photo");

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/gallery" className="hover:text-gold">გალერეა</a> / ფოტო გალერეა
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ფოტო გალერეა</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pb-16">
          {photos.map((p) => (
            <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
              {p.image_url && <Image src={p.image_url} alt={p.title || ""} fill className="object-cover" />}
            </div>
          ))}
        </div>
        {photos.length === 0 && <p className="opacity-50 text-sm pb-16">ფოტო ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
