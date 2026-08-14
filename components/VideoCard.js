"use client";
import { useState } from "react";
import Icon from "./Icon";
import { getYouTubeId } from "@/lib/youtube";

export default function VideoCard({ title, video_url, views }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(video_url);

  return (
    <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 transition-colors">
      <div className="relative aspect-video bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
        {playing && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : videoId ? (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`დაკვრა: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-crimson flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="play" size={22} className="text-white ml-0.5" />
              </div>
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <Icon name="play" size={26} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        {views && <div className="text-xs opacity-50">{views}</div>}
      </div>
    </div>
  );
}
