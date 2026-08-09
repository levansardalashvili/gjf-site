import "./globals.css";

export const metadata = {
  title: "საქართველოს ჯუდოს ფედერაცია",
  description: "ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ka">
      <body className="font-sans">{children}</body>
    </html>
  );
}
