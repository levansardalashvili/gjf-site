export default function Footer() {
  return (
    <footer id="contact" className="bg-ink-2 border-t border-line pt-10 pb-6 mt-5">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid gap-7 grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif font-bold text-lg mb-3">საქართველოს ჯუდოს ფედერაცია</div>
            <p className="text-sm opacity-60 max-w-[280px]">
              ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.
            </p>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wide opacity-55 mb-3">ფედერაცია</h5>
            <a className="block text-sm py-1 opacity-80" href="/federation">შემადგენლობა</a>
            <a className="block text-sm py-1 opacity-80" href="/federation/statute">წესდება</a>
            <a className="block text-sm py-1 opacity-80" href="/clubs">კლუბები</a>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wide opacity-55 mb-3">რესურსები</h5>
            <a className="block text-sm py-1 opacity-80" href="/gallery">გალერეა</a>
            <a className="block text-sm py-1 opacity-80" href="/history">ისტორია</a>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wide opacity-55 mb-3">კონტაქტი</h5>
            <a className="block text-sm py-1 opacity-80" href="/contact">თბილისი, საქართველო</a>
            <a className="block text-sm py-1 opacity-80" href="mailto:info@gjf.ge">info@gjf.ge</a>
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-line flex justify-between flex-wrap gap-2 text-xs opacity-50">
          <span>© {new Date().getFullYear()} საქართველოს ჯუდოს ფედერაცია</span>
        </div>
      </div>
    </footer>
  );
}
