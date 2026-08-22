# SQL ფაილების შესახებ

ეს საქაღალდე შეიცავს ყველა SQL ფაილს, რომელიც ოდესმე გაშვებულა Supabase-ის
**SQL Editor**-ში ამ პროექტის ბაზის ასაწყობად/შესაცვლელად. root-იდან აქ
გადმოტანილია მხოლოდ მოწესრიგებისთვის — ბაზაზე ეს გადატანა არაფერს არ ცვლის.

## ⚠️ მნიშვნელოვანი — ეს არ არის "სუფთა" migration ისტორია

ეს ფაილები **ისტორიულად, სხვადასხვა დროს, ხელით არის დაწერილი და Supabase
SQL Editor-ში ჩასმული** — არა ავტომატური migration tool-ით (მაგ. Supabase
CLI-ს `supabase migration`) გენერირებული. ამის გამო:

- **ვერ იქნება საიმედოდ თავიდან, ცარიელ ბაზაზე გაშვებული** ერთიანი, სწორი
  თანმიმდევრობით — რამდენიმე ფაილი ერთსა და იმავე ცხრილს ხელახლა განსაზღვრავს
  (`create table if not exists ...`) სხვადასხვა/განახლებული სვეტებით თუ
  მონაცემებით (მაგ. `supabase-schema-regulations.sql`,
  `-regulations-cards.sql`, `-regulations-docs.sql`, `-regulations-full.sql`
  ოთხივე ქმნის/ავსებს `regulations` ცხრილს, სხვადასხვა ვერსიის მონაცემით).
- ზუსტი გაშვების თანმიმდევრობა ცოცხალ ბაზაზე **ამ repo-დან ცალსახად არ
  აღდგება** — რამდენიმე ფაილი ერთსა და იმავე git commit-შია დამატებული,
  ანუ commit history-იც ვერ იძლევა 100%-იან პასუხს რომელი პირველად გაეშვა.
- ეს ფაილები აქ ინახება **ისტორიული ჩანაწერის/დოკუმენტაციის** მიზნით და
  იმისთვის, რომ ახალმა კონტრიბუტორმა/AI ასისტენტმა თვალი მიაწვდინოს რა
  ცვლილებები განხორციელდა დროთა განმავლობაში — არა როგორც "თავიდან
  გაუშვი ეს ყველაფერი და მიიღებ დღევანდელ სქემას" ინსტრუქცია.

**თუ გჭირდებათ ბაზის რეალური, დღევანდელი მდგომარეობა** — ეს ფაილებით კი არ
გამოითვლება, არამედ პირდაპირ Supabase-დან უნდა მოვიდეს:
`supabase db dump --schema public -f current-schema.sql` (თუ Supabase CLI
გაქვთ დაყენებული და პროექტთან დაკავშირებული), ან Supabase დაშბორდის
**Database → Backups** სექციიდან.

## საორიენტაციო ქრონოლოგია (git history-ის მიხედვით, არა გარანტირებული)

დაჯგუფებული commit-ის თარიღის მიხედვით — ერთ ჯგუფში მყოფი ფაილების
ურთიერთშორის თანმიმდევრობა შეიძლება არ ემთხვეოდეს რეალურად გაშვების რიგს:

| თარიღი | ფაილები |
|---|---|
| 2026-08-09 | `supabase-schema.sql` (საბაზისო: news/events/clubs), `-commissions`, `-committee`, `-national-team`, `-partners`, `-projects-fix`, `-regions`, `-regulations`, `-regulations-cards`, `-regulations-docs`, `-regulations-full`, `-results-detail`, `-results-gallery-contact`, `-results-gallery`, `-results-import`, `-staff`, `-statute-update` |
| 2026-08-11 | `-calendar-notice`, `-calendar-regulations`, `-structure` |
| 2026-08-12 | `-events-date`, `-events-date-fix`, `-gallery-albums`, `-ijf-calendar`, `-social-links` |
| 2026-08-13 | `-main-events`, `-news-bilingual`, `-portal-links`, `-projects-results-bilingual` |
| 2026-08-14 | `-activity-log`, `-athlete-profiles`, `-fix-athlete-slugs`, `-judo-history-content`, `-medal-records`, `-fix-all-slugs`, `-contact-messages` |
| 2026-08-20 | `-disable-realtime`, `-react-write-policies` |
| 2026-08-21 | `-events-bilingual`, `-calendar-yearly-pdf`, `-live-broadcast`, `-results-missing-columns` |

## რეკომენდაცია — ახალი ცვლილებებისთვის

ამ ქაოსის განმეორების თავიდან ასაცილებლად, ახალი schema ცვლილებებისთვის
რეკომენდებულია:

1. **Supabase CLI**-ის დაყენება (`npm install -g supabase`) და პროექტთან
   დაკავშირება (`supabase link`) — ამის შემდეგ `supabase migration new
   <სახელი>` ქმნის ერთ, დროის შტამპიან ფაილს ამ საქაღალდეში, სწორი
   თანმიმდევრობით, და Supabase თავად აღრიცხავს რომელი migration უკვე
   გაშვებულია ცოცხალ ბაზაზე (`supabase db push`).
2. თუ CLI-ის გამოყენება არ გსურთ და კვლავ SQL Editor-ით გააგრძელებთ —
   მაინც შეინახეთ თითო ცვლილება **ერთ ახალ ფაილად** ამ საქაღალდეში,
   სახელით `YYYY-MM-DD-description.sql` (თარიღი თავიდანვე თანმიმდევრობას
   იძლევა), და **არასდროს** გადაწერეთ/წაშალოთ ძველი ფაილი.
