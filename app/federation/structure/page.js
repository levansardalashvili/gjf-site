import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrgChart from "@/components/OrgChart";
import { getAllStructureNodes } from "@/lib/queries";

export const revalidate = 0;

export default async function StructurePage() {
  const nodes = await getAllStructureNodes();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/federation" className="hover:text-gold">ფედერაცია</a> / სტრუქტურა
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">სტრუქტურა</h1>
        </div>

        <div className="pb-16 overflow-x-auto">
          <OrgChart nodes={nodes} />
        </div>
        {nodes.length === 0 && <p className="opacity-50 text-sm pb-16">სტრუქტურის ელემენტი ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
