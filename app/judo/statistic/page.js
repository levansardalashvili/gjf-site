import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllMedalRecords } from "@/lib/queries";

export const revalidate = 0;

const COLUMNS = [
  { group: "ოლიმპიადა", keys: ["olympic_gold", "olympic_silver", "olympic_bronze"] },
  { group: "მსოფლიოს ჩემპ.", keys: ["world_gold", "world_silver", "world_bronze"] },
  { group: "ევროპის ჩემპ.", keys: ["european_gold", "european_silver", "european_bronze"] },
];
const MEDAL_LABELS = ["ოქრო", "ვერცხ.", "ბრინჯ."];
const MEDAL_BG = ["bg-gold/15", "bg-black/5", "bg-crimson/10"];

export default async function StatisticPage() {
  const records = await getAllMedalRecords();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ისტორია / სტატისტიკა</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">მედლების სტატისტიკა</h1>
          <p className="opacity-60 max-w-xl">საქართველოს ეროვნული ნაკრების მედლოსნები — ოლიმპიური თამაშები, მსოფლიოსა და ევროპის ჩემპიონატები.</p>
        </div>

        <div className="overflow-x-auto pb-16">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[900px]">
            <thead>
              <tr>
                <th rowSpan={2} className="sticky left-0 bg-ink text-left p-2.5 border-b border-line align-bottom">მედალოსანი</th>
                {COLUMNS.map((col) => (
                  <th key={col.group} colSpan={3} className="p-2.5 text-center border-b border-line font-serif">
                    {col.group}
                  </th>
                ))}
              </tr>
              <tr>
                {COLUMNS.map((col) =>
                  MEDAL_LABELS.map((label, i) => (
                    <th key={col.group + label} className={`p-2 text-center border-b border-line font-normal opacity-60 ${MEDAL_BG[i]}`}>
                      {label}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-line hover:bg-ink-2/50 transition-colors">
                  <td className="sticky left-0 bg-ink p-2.5 font-semibold whitespace-nowrap">{r.athlete_name}</td>
                  {COLUMNS.map((col) =>
                    col.keys.map((key, i) => (
                      <td key={key} className={`p-2 text-center whitespace-nowrap ${MEDAL_BG[i]}`}>
                        {r[key] || ""}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && <p className="opacity-50 text-sm pt-8">მონაცემები ჯერ არ არის დამატებული.</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
