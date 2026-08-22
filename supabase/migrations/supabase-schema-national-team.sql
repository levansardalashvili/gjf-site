-- ეროვნული ნაკრების ბლოკისთვის — მწვრთნელთა შტაბის გვერდი (pages ცხრილში)
insert into pages (slug, title, body)
values ('national-team-staff', 'მწვრთნელთა შტაბი', 'ეროვნული ნაკრების მწვრთნელთა შტაბის შემადგენლობა დაემატება მალე.')
on conflict (slug) do nothing;
