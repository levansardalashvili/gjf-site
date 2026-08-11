"use client";
import { useState } from "react";
import NewsCard from "./NewsCard";
import Reveal from "./Reveal";
import Pagination from "./Pagination";

const PER_PAGE = 12;

export default function NewsGrid({ news }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(news.length / PER_PAGE));
  const pageItems = news.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function changePage(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div key={page} className="tab-fade grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-8">
        {pageItems.map((n, i) => (
          <Reveal key={n.slug} delay={Math.min((i % 5) + 1, 5)}>
            <NewsCard {...n} />
          </Reveal>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={changePage} />

      {news.length === 0 && <p className="opacity-50 text-sm pb-8">სიახლე ჯერ არ არის დამატებული.</p>}
    </>
  );
}
