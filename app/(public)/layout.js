import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ეს layout მხოლოდ საჯარო გვერდებს ეხმარება (admin/api-ს არ ეხება,
// რადგან ისინი ცალკე route group-შია) — Header/Footer ერთხელ იტვირთება
// და გვერდიდან გვერდზე გადასვლისას აღარ "იშლება" და "შენდება" თავიდან.
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
