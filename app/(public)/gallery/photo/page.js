import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { getAllGalleryAlbums, getAllGalleryItems } from "@/lib/queries";
import Trans from "@/components/Trans";

export const revalidate = 0;

export default async function GalleryPhotoPage() {
  const albums = await getAllGalleryAlbums();
  const allItems = await getAllGalleryItems();

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/gallery" className="hover:text-gold"><Trans k="gallery" /></a> / <Trans k="photoGallery" />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="photoGallery" /></h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {albums.map((a, i) => {
            const count = allItems.filter((it) => it.album_id === a.id && it.type === "photo").length;
            return (
              <Reveal key={a.id} delay={Math.min((i % 5) + 1, 5)}>
                <Link
                  href={`/gallery/photo/${a.id}`}
                  className="group block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
                    {a.cover_image_url && (
                      <Image src={a.cover_image_url} alt={a.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-base mb-1">{a.title}</h3>
                    <p className="text-sm opacity-55">{count} <Trans k="photoCount" /></p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        {albums.length === 0 && <p className="opacity-50 text-sm pb-16"><Trans k="noAlbumsYet" /></p>}
      </main>
    </>
  );
}
