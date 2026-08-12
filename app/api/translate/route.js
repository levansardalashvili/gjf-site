import { NextResponse } from "next/server";

// უფასო, გასაღების გარეშე მუშაობადი თარგმნის სერვისი (MyMemory).
// შენიშვნა: ხარისხი კარგია მოკლე/საშუალო ტექსტისთვის, მაგრამ ზუსტი,
// ოფიციალური თარგმანისთვის (მაგ. წესდება) მაინც შესამოწმებელია ხელით.
export async function POST(request) {
  const { text, source = "ka", target = "en" } = await request.json();

  if (!text || !text.trim()) {
    return NextResponse.json({ error: "ტექსტი ცარიელია" }, { status: 400 });
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${source}|${target}`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    if (!translated) {
      return NextResponse.json({ error: "თარგმნა ვერ მოხერხდა" }, { status: 502 });
    }
    return NextResponse.json({ translated });
  } catch (err) {
    return NextResponse.json({ error: "თარგმნის სერვისთან კავშირი ვერ დამყარდა" }, { status: 502 });
  }
}
