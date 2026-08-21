// Google-ისთვის სტრუქტურული მონაცემი — "ეს არის სპორტული ღონისძიება" (თარიღით, ადგილით).
// description უნდა გადაეცეს უკვე HTML-ისგან გასუფთავებული (stripHtml-ით).
export default function SportsEventJsonLd({ event, url, description }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.title,
    sport: "Judo",
    ...(event.event_date ? { startDate: event.event_date } : {}),
    ...(event.location ? { location: { "@type": "Place", name: event.location } } : {}),
    ...(description ? { description } : {}),
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
