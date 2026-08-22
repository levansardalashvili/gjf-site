create table if not exists regulations (
  id bigint generated always as identity primary key,
  title text not null,
  excerpt text,
  file_url text,
  file_name text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table regulations enable row level security;
drop policy if exists "public read regulations" on regulations;
create policy "public read regulations" on regulations for select using (true);

-- ძველი placeholder ტექსტური გვერდი (federation-regulations) აღარ გვჭირდება — ჩანაცვლდა ბარათებით
delete from pages where slug = 'federation-regulations';

insert into regulations (title, excerpt, file_url, file_name, sort_order) values
('სპორტსმენთა და მწვრთნელთა ურთიერთობის შესახებ',
 'პირადი მწვრთნელის შეცვლის წესები და ფედერაციის როლი ამ პროცესში.',
 '/regulations/mcvrtneli-sportsmeni.pdf', 'მწვრთნელი-სპორტსმენი.pdf', 1),

('სხვა ქვეყნის სახელით გამოსვლასთან დაკავშირებით (განახლებული, 2019)',
 'ვადა და პირობები ნაკრების წევრისთვის, თუ სურს სხვა ქვეყნის სახელით გამოსვლა.',
 '/regulations/sxva_saxelit.pdf', 'სხვა-ქვეყნის-სახელით-2019.pdf', 2),

('სხვა ქვეყნის სახელით გამოსვლასთან დაკავშირებით (2013)',
 'საწყისი ვერსია — მინიმალური ვადა და პირობები ნაკრების წევრისთვის.',
 '/regulations/debuleba-sazgvargaret-gadasvlaze.pdf', 'სხვა-ქვეყნის-სახელით-2013.pdf', 3),

('ჭაბუკთა და ახალგაზრდული ნაკრების წონის კლებასთან დაკავშირებით',
 'წესები სპორტსმენთა წონის კონტროლისა და საშეჯიბრო დაშვების შესახებ.',
 '/regulations/wonis-kleba.pdf', 'წონის-კლება.pdf', 4),

('სხვადასხვა სპორტის სახეობაში გამოსვლასთან დაკავშირებით',
 'რა წესით შეიძლება ნაკრების წევრმა სხვა სპორტში მონაწილეობა მიიღოს.',
 '/regulations/sxva-saxeobashi-gamosvla.pdf', 'სხვა-სახეობაში-გამოსვლა.pdf', 5),

('ეროვნულ ჩემპიონატში მონაწილეობის უფლების განსაზღვრის შესახებ',
 'საკვალიფიკაციო/ზონალური შედეგებზე დაფუძნებული დაშვების წესები.',
 '/regulations/agmaskomis_debuleba_sak_chemp_2015.pdf', 'ეროვნული-ჩემპიონატის-დაშვება.pdf', 6),

('საკლუბო ჩემპიონატი — სტრუქტურა და განვითარების სტრატეგია',
 'მონაწილეობის პრინციპები, საპრიზო ფონდი და დაფინანსების განაწილების წესი.',
 '/regulations/club-project.pdf', 'საკლუბო-ჩემპიონატი-სტრუქტურა.pdf', 7),

('საკლუბო ჩემპიონატი — გუნდების ფორმირების წესი',
 'გუნდების დაკომპლექტება რეიტინგის მიხედვით და შეჯიბრების ეტაპები.',
 '/regulations/club-cadet.pdf', 'საკლუბო-ჩემპიონატი-გუნდები.pdf', 8),

('ზონალური წარმომადგენლობების შექმნისა და საქმიანობის შესახებ',
 'აღმოსავლეთ/დასავლეთ საქართველოს ზონალური სტრუქტურა და წარმომადგენლის არჩევის წესი.',
 '/regulations/zonaluri.pdf', 'ზონალური-წარმომადგენლობა.pdf', 9),

('ფინანსური სახსრების ეფექტური გამოყენება ეროვნულ ნაკრებთან მიმართებაში',
 'აღმასკომის დადგენილება საკლუბო ჩემპიონატის საპრიზო ფონდისა და დაფინანსების შესახებ.',
 '/regulations/2019_01_22-dadgenileba_xarjebi.pdf', 'დადგენილება-ხარჯები-2019.pdf', 10);

select count(*) as regulations_count from regulations;
