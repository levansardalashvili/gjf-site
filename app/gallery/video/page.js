import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGalleryByType } from "@/lib/queries";

export const revalidate = 0;

export default async function GalleryVideoPage() {
  const videos = await getGalleryByType("video");

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/gallery" className="hover:text-gold">გალერეა</a> / ვიდეო გალერეა
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ვიდეო გალერეა</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {videos.map((v) => (
            <a
              key={v.id}
              href={v.video_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 transition-colors"
            >
              <div className="aspect-video bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] flex items-center justify-center text-2xl opacity-60">▶</div>
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1">{v.title}</h3>
                {v.views && <div className="text-xs opacity-50">{v.views}</div>}
              </div>
            </a>
          ))}
        </div>
        {videos.length === 0 && <p className="opacity-50 text-sm pb-16">ვიდეო ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
