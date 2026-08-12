import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlbumGallery from "@/components/AlbumGallery";
import { getGalleryAlbumById, getPhotosByAlbum } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AlbumDetailPage({ params }) {
  const album = await getGalleryAlbumById(params.id);
  if (!album) notFound();
  const photos = await getPhotosByAlbum(params.id);

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/gallery/photo" className="hover:text-gold">ფოტო გალერეა</a> / {album.title}
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{album.title}</h1>
        </div>

        <AlbumGallery photos={photos} />
        {photos.length === 0 && <p className="opacity-50 text-sm pb-16">ფოტო ჯერ არ არის დამატებული ამ ალბომში.</p>}
      </main>
      <Footer />
    </>
  );
}
