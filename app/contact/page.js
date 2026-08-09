import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageBySlug } from "@/lib/queries";

export const revalidate = 0;

export default async function ContactPage() {
  const [address, email, social] = await Promise.all([
    getPageBySlug("contact-address"),
    getPageBySlug("contact-email"),
    getPageBySlug("contact-social"),
  ]);

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / კონტაქტი</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">კონტაქტი</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pb-16">
          {address && (
            <div className="bg-ink-2 border border-line rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wide opacity-55 mb-2">{address.title}</div>
              <p className="text-sm">{address.body}</p>
            </div>
          )}
          {email && (
            <div className="bg-ink-2 border border-line rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wide opacity-55 mb-2">{email.title}</div>
              <a href={`mailto:${email.body}`} className="text-sm text-gold">{email.body}</a>
            </div>
          )}
          {social && (
            <div className="bg-ink-2 border border-line rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wide opacity-55 mb-2">{social.title}</div>
              <p className="text-sm">{social.body}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
