"use client";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

const SCROLL_SPEED = 6; // px ერთ frame-ზე, hover-ის დროს

export default function ProjectsScroller({ projects }) {
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);
  const directionRef = useRef(0);

  function step() {
    if (scrollerRef.current && directionRef.current !== 0) {
      scrollerRef.current.scrollLeft += directionRef.current * SCROLL_SPEED;
      rafRef.current = requestAnimationFrame(step);
    }
  }

  function startScroll(dir) {
    directionRef.current = dir;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  }

  function stopScroll() {
    directionRef.current = 0;
    cancelAnimationFrame(rafRef.current);
  }

  if (projects.length === 0) return null;

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar pl-[max(1.25rem,calc((100vw-1400px)/2+1.25rem))] pr-[max(1.25rem,calc((100vw-1400px)/2+1.25rem))]"
      >
        {projects.map((p) => (
          <div key={p.slug} className="shrink-0">
            <ProjectCard {...p} fixedWidth />
          </div>
        ))}
      </div>

      {/* უხილავი hover-ზონები — მარცხენა/მარჯვენა კიდეზე მაუსის მიტანისას სქროლავს */}
      <div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-16 cursor-w-resize"
        onMouseEnter={() => startScroll(-1)}
        onMouseLeave={stopScroll}
      />
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-16 cursor-e-resize"
        onMouseEnter={() => startScroll(1)}
        onMouseLeave={stopScroll}
      />
    </div>
  );
}
