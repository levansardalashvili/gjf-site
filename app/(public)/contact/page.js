import { getPageBySlug, getAllSocialLinks } from "@/lib/queries";
import Trans from "@/components/Trans";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
  const [address, email, phone, social, socialLinks] = await Promise.all([
    getPageBySlug("contact-address"),
    getPageBySlug("contact-email"),
    getPageBySlug("contact-phone"),
    getPageBySlug("contact-social"),
    getAllSocialLinks(),
  ]);

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5"><Trans k="home_bc" /> / <Trans k="contact" /></div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="contact" /></h1>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-8">
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
          {phone && (
            <div className="bg-ink-2 border border-line rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wide opacity-55 mb-2">{phone.title}</div>
              <a href={`tel:${phone.body?.replace(/\s+/g, "")}`} className="text-sm text-gold">{phone.body}</a>
            </div>
          )}
          <div className="bg-ink-2 border border-line rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wide opacity-55 mb-3">{social?.title || "სოც. ქსელები"}</div>
            <SocialIcons links={socialLinks} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5 mb-16">
          <div className="rounded-2xl overflow-hidden border border-line">
            <iframe
              title="შოთა ჩოჩიშვილის სახელობის ძიუდოს აკადემია — რუკა"
              src="https://www.google.com/maps?q=%E1%83%A8%E1%83%9D%E1%83%97%E1%83%90+%E1%83%A9%E1%83%9D%E1%83%A9%E1%83%98%E1%83%A8%E1%83%95%E1%83%98%E1%83%9A%E1%83%98%E1%83%A1+%E1%83%A1%E1%83%90%E1%83%AE%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%98%E1%83%A1+%E1%83%AB%E1%83%98%E1%83%A3%E1%83%93%E1%83%9D%E1%83%A1+%E1%83%90%E1%83%99%E1%83%90%E1%83%93%E1%83%94%E1%83%9B%E1%83%98%E1%83%90%2C+%E1%83%91%E1%83%94%E1%83%9A%E1%83%98%E1%83%90%E1%83%A8%E1%83%95%E1%83%98%E1%83%9A%E1%83%98%E1%83%A1+%E1%83%A5%E1%83%A3%E1%83%A9%E1%83%90+38%2C+%E1%83%97%E1%83%91%E1%83%98%E1%83%9A%E1%83%98%E1%83%A1%E1%83%98&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ContactForm />
        </div>
      </main>
    </>
  );
}
