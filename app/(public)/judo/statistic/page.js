import { getAllMedalRecords } from "@/lib/queries";

export const revalidate = 60;

const GROUPS = [
  { title: "ოლიმპიური თამაშები", keys: { gold: "olympic_gold", silver: "olympic_silver", bronze: "olympic_bronze" } },
  { title: "მსოფლიოს ჩემპიონატი", keys: { gold: "world_gold", silver: "world_silver", bronze: "world_bronze" } },
  { title: "ევროპის ჩემპიონატი", keys: { gold: "european_gold", silver: "european_silver", bronze: "european_bronze" } },
];

// ნამდვილი მედლის ფერები — ფონი და ტექსტი
const MEDAL_STYLE = {
  gold: { header: "bg-[#D4AF37] text-[#3a2e05]", cell: "bg-[#D4AF37]/12" },
  silver: { header: "bg-[#B8BCC2] text-[#2b2d31]", cell: "bg-[#B8BCC2]/15" },
  bronze: { header: "bg-[#C9803C] text-white", cell: "bg-[#C9803C]/12" },
};

function MedalTable({ title, keys, records }) {
  // მხოლოდ ის სპორტსმენები, ვისაც ამ კონკრეტულ ჯგუფში აქვს რომელიმე მედალი
  const rows = records.filter((r) => r[keys.gold] || r[keys.silver] || r[keys.bronze]);
  if (rows.length === 0) return null;

  return (
    <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden mb-8">
      <div className="px-5 py-4 border-b border-line">
        <h2 className="font-serif font-bold text-lg">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-[500px]">
          <thead>
            <tr>
              <th className="text-left p-3 opacity-60 font-normal text-xs uppercase tracking-wide">მედალოსანი</th>
              <th className={`p-3 text-center font-bold text-xs uppercase tracking-wide ${MEDAL_STYLE.gold.header}`}>ოქრო</th>
              <th className={`p-3 text-center font-bold text-xs uppercase tracking-wide ${MEDAL_STYLE.silver.header}`}>ვერცხლი</th>
              <th className={`p-3 text-center font-bold text-xs uppercase tracking-wide ${MEDAL_STYLE.bronze.header}`}>ბრინჯაო</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="p-3 font-semibold whitespace-nowrap">{r.athlete_name}</td>
                <td className={`p-3 text-center whitespace-nowrap ${MEDAL_STYLE.gold.cell}`}>{r[keys.gold] || ""}</td>
                <td className={`p-3 text-center whitespace-nowrap ${MEDAL_STYLE.silver.cell}`}>{r[keys.silver] || ""}</td>
                <td className={`p-3 text-center whitespace-nowrap ${MEDAL_STYLE.bronze.cell}`}>{r[keys.bronze] || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function StatisticPage() {
  const records = await getAllMedalRecords();

  return (
    <>
      <main className="max-w-[1000px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ისტორია / სტატისტიკა</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">მედლების სტატისტიკა</h1>
          <p className="opacity-60 max-w-xl">საქართველოს ეროვნული ნაკრების მედლოსნები — ოლიმპიური თამაშები, მსოფლიოსა და ევროპის ჩემპიონატები.</p>
        </div>

        <div className="pb-16">
          {GROUPS.map((g) => (
            <MedalTable key={g.title} title={g.title} keys={g.keys} records={records} />
          ))}
          {records.length === 0 && <p className="opacity-50 text-sm">მონაცემები ჯერ არ არის დამატებული.</p>}
        </div>
      </main>
    </>
  );
}
