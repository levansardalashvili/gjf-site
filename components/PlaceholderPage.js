// მარტივი შაბლონი გვერდებისთვის, რომელთა შიგთავსიც ჯერ არ არის განსაზღვრული.
// TODO: შეცვალე რეალური კონტენტით (ტექსტი, ცხრილი, სია — რაც სჭირდება კონკრეტულ გვერდს).
export default function PlaceholderPage({ breadcrumb, title, description, children }) {
  return (
    <main className="max-w-4xl mx-auto px-5">
      <div className="pt-10 pb-8">
        <div className="text-sm opacity-50 mb-3.5">{breadcrumb}</div>
        <h1 className="font-serif font-bold text-3xl md:text-4xl mb-3">{title}</h1>
        {description && <p className="opacity-65 max-w-xl">{description}</p>}
      </div>
      {children ? (
        <div className="pb-16">{children}</div>
      ) : (
        <div className="pb-16 bg-ink-2 border border-line rounded-2xl p-8 text-sm opacity-50">
          ეს გვერდი მზადაა სტრუქტურულად — კონტენტი (ტექსტი/სია/ცხრილი) დასამატებელია.
        </div>
      )}
    </main>
  );
}
