import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

// ⚠️ განზრახ არ ვკითხულობთ აქ (და არც news/[slug], calendar/[slug],
// federation/projects/[slug]-ის generateMetadata-ში) ენის cookie-ს next/headers
// cookies()-ით — ეს Next.js-ს აიძულებს, route-ი force-dynamic გახადოს (ISR/static
// კეშირება მთლიანად გაუქმდება, თუნდაც revalidate მითითებული იყოს). თავად
// გვერდის კონტენტი (title/body) მაინც სწორად ერთვება ინგლისურ ვერსიაზე —
// კლიენტის მხარეს, useLanguage()-ით (იხ. lib/i18n.js) — უბრალოდ <title>/OG
// tags აქ სტატიკურად, ქართულად რჩება (ისედაც crawler-ებს cookie არასდროს
// მიაქვთ, ასე რომ OG preview ისედაც ყოველთვის ნაგულისხმევ ენაზე გამოჩნდებოდა).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "საქართველოს ძიუდოს ფედერაცია",
    template: "%s — საქართველოს ძიუდოს ფედერაცია",
  },
  description: "ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.",
  openGraph: {
    title: "საქართველოს ძიუდოს ფედერაცია",
    description: "ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.",
    url: SITE_URL,
    siteName: "საქართველოს ძიუდოს ფედერაცია",
    locale: "ka_GE",
    type: "website",
  },
  alternates: {
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "საქართველოს ძიუდოს ეროვნული ფედერაცია",
  alternateName: "Georgian Judo Federation",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sport: "Judo",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ბელიაშვილის ქუჩა 38",
    addressLocality: "თბილისი",
    addressCountry: "GE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ka">
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
