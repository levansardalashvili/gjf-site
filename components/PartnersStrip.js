import Image from "next/image";

export default function PartnersStrip({ partners }) {
  if (partners.length === 0) return null;

  return (
    <div className="w-full py-16 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-5">
        <h2 className="font-serif font-bold text-2xl mb-6">პარტნიორები</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {partners.map((p) => {
            const Wrapper = p.website_url ? "a" : "div";
            const wrapperProps = p.website_url ? { href: p.website_url, target: "_blank", rel: "noreferrer" } : {};
            return (
              <Wrapper
                key={p.id}
                {...wrapperProps}
                className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <Image src={p.logo_url} alt={p.name} fill className="object-contain p-4" />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
