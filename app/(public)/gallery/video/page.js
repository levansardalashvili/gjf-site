import Trans from "@/components/Trans";
import VideoCard from "@/components/VideoCard";
import { getGalleryByType } from "@/lib/queries";

export const revalidate = 0;

export default async function GalleryVideoPage() {
  const videos = await getGalleryByType("video");

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/gallery" className="hover:text-gold"><Trans k="gallery" /></a> / <Trans k="videoGallery" />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="videoGallery" /></h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {videos.map((v) => (
            <VideoCard key={v.id} title={v.title} video_url={v.video_url} views={v.views} />
          ))}
        </div>
        {videos.length === 0 && <p className="opacity-50 text-sm pb-16"><Trans k="noVideosYet" /></p>}
      </main>
    </>
  );
}
