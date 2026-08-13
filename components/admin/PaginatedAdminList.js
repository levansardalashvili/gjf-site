"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Pagination from "@/components/Pagination";

const PER_PAGE = 15;

// გამოსაყენებელია ყველგან, სადაც admin-ის სია (avatar/logo/უბრალო) pagination-ს საჭიროებს.
// type: "avatar" (მრგვალი ფოტო + სახელი + როლი), "logo" (ოთხკუთხა ლოგო + სახელი), "simple" (მხოლოდ ტექსტი)
export default function PaginatedAdminList({ items, type, editPrefix, apiPrefix, emptyText }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const pageItems = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (items.length === 0) {
    return <p className="p-6 text-sm opacity-50 bg-ink-2 border border-line rounded-2xl">{emptyText}</p>;
  }

  return (
    <>
      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {pageItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
            {type === "avatar" && (
              item.photo_url ? (
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                  <Image src={item.photo_url} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0">
                  {item.name.charAt(0)}
                </div>
              )
            )}
            {type === "logo" && (
              <div className="relative w-16 h-12 bg-white rounded-md overflow-hidden shrink-0">
                <Image src={item.logo_url} alt={item.name} fill sizes="64px" className="object-contain p-1.5" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              {type !== "simple" && item.sort_order !== undefined && (
                <div className="text-xs opacity-50">თანმიმდევრობა: {item.sort_order}</div>
              )}
              {type === "simple" && (
                <div className="text-xs opacity-50">{item.region} · {item.members} წევრი</div>
              )}
              <div className="font-semibold truncate">{item.name}</div>
              {item.role && <div className="text-sm opacity-60 truncate">{item.role}</div>}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link href={`${editPrefix}/${item.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`${apiPrefix}/${item.id}`} confirmText={`წავშალო "${item.name}"?`} />
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
