import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestModeBanner from "@/components/TestModeBanner";

// ეს layout მხოლოდ საჯარო გვერდებს ეხმარება (admin/api-ს არ ეხება,
// რადგან ისინი ცალკე route group-შია) — Header/Footer ერთხელ იტვირთება
// და გვერდიდან გვერდზე გადასვლისას აღარ "იშლება" და "შენდება" თავიდან.
//
// TestModeBanner: ოფიციალურ გაშვებამდე გაჩენილი შეტყობინება — როცა
// gjf.ge-ზე რეალურად გავალთ, უბრალოდ წაშალე ეს ერთი ხაზი ქვემოთ.
export default function PublicLayout({ children }) {
  return (
    <>
      <TestModeBanner />
      <Header />
      {children}
      <Footer />
    </>
  );
}
