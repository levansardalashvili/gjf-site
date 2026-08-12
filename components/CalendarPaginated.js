"use client";
import { useState } from "react";
import EventRow from "./EventRow";
import Pagination from "./Pagination";

const PER_PAGE = 12;

export default function CalendarPaginated({ events }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(events.length / PER_PAGE));
  const pageItems = events.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function changePage(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div key={page} className="tab-fade border-t border-line">
        {pageItems.length ? pageItems.map((e) => <EventRow key={e.slug} {...e} />) : (
          <p className="opacity-50 py-8 text-sm">ამჟამად დაგეგმილი ღონისძიება არ არის.</p>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={changePage} />
    </>
  );
}
