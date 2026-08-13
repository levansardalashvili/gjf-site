import { NextResponse } from "next/server";

// უფასო, გასაღების გარეშე მუშაობადი თარგმნის სერვისი (MyMemory).
// შენიშვნა: ხარისხი კარგია მოკლე/საშუალო ტექსტისთვის, მაგრამ ზუსტი,
// ოფიციალური თარგმანისთვის (მაგ. წესდება) მაინც შესამოწმებელია ხელით.

// MyMemory-ის ლიმიტი ერთ მოთხოვნაზე — 500 ბაიტი. ქართული ასო UTF-8-ში
// ~3 ბაიტს იკავებს, ამიტომ უსაფრთხოების ზღვრით ვჭრით.
const MAX_CHARS_PER_CHUNK = 140;

function splitIntoChunks(text) {
  // წინადადებებად ვჭრით (წერტილი/კითხვის/ძახილის ნიშნის მიხედვით),
  // მერე ვაგროვებთ ლიმიტამდე, რომ სიტყვები არ გაიჭრას შუაში.
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > MAX_CHARS_PER_CHUNK && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

async function translateChunk(text, source, target) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${source}|${target}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.responseData?.translatedText || "";
}

export async function POST(request) {
  const { text, source = "ka", target = "en" } = await request.json();

  if (!text || !text.trim()) {
    return NextResponse.json({ error: "ტექსტი ცარიელია" }, { status: 400 });
  }

  try {
    const chunks = splitIntoChunks(text);
    const translated = [];

    for (const chunk of chunks) {
      const result = await translateChunk(chunk, source, target);
      translated.push(result);
    }

    const fullText = translated.join(" ").trim();
    if (!fullText) {
      return NextResponse.json({ error: "თარგმნა ვერ მოხერხდა" }, { status: 502 });
    }
    return NextResponse.json({ translated: fullText });
  } catch (err) {
    return NextResponse.json({ error: "თარგმნის სერვისთან კავშირი ვერ დამყარდა" }, { status: 502 });
  }
}
