-- "მთლიანი წლის კალენდარი" PDF — მხოლოდ /calendar/georgia გვერდზე ჩანს.
-- admin-იდან შესავსებია: /admin/contact-ის მსგავსად, generic pages ჩანაწერია.
insert into pages (slug, title, body)
values ('calendar-yearly-pdf', 'მთლიანი წლის კალენდარი', '')
on conflict (slug) do nothing;
