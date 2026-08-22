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

insert into regulations (title, excerpt, file_url, file_name, sort_order) values
('სპორტსმენთა და მწვრთნელთა ურთიერთობის შესახებ',
 'პირადი მწვრთნელის შეცვლის წესი და ნაკრები გუნდის მთავარ მწვრთნელთა შეზღუდვები.',
 '/regulations/mcvrtneli-sportsmeni.pdf', 'მწვრთნელი-სპორტსმენი.pdf', 1),

('სხვა ქვეყნის სახელით გამოსვლასთან დაკავშირებით',
 'ნაკრები გუნდის წევრს სხვა ქვეყნის სახელით გამოსვლაზე უარი ეთქმის მინიმალური ვადით.',
 '/regulations/debuleba-sazgvargaret-gadasvlaze.pdf', 'სხვა-ქვეყნის-სახელით-გამოსვლა.pdf', 2),

('ჭაბუკთა და ახალგაზრდული ნაკრების წონის კლებასთან დაკავშირებით',
 'წონის კონტროლისა და საშეჯიბრო წონის ზღვრული გადახრის წესები.',
 '/regulations/wonis-kleba.pdf', 'წონის-კლება.pdf', 3),

('სხვადასხვა სპორტის სახეობაში გამოსვლასთან დაკავშირებით',
 'ნაკრები გუნდის წევრის სხვა სპორტში ერთჯერადი გამოსვლის შეთანხმების წესი.',
 '/regulations/sxva-saxeobashi-gamosvla.pdf', 'სხვა-სახეობაში-გამოსვლა.pdf', 4),

('ეროვნულ ჩემპიონატში მონაწილეობის უფლების განსაზღვრის შესახებ',
 'ზონალური/სალიცენზიო შეჯიბრებიდან ეროვნულ ჩემპიონატზე დაშვების კრიტერიუმები.',
 '/regulations/agmaskomis_debuleba_sak_chemp_2015.pdf', 'ჩემპიონატში-მონაწილეობა-2015.pdf', 5),

('საკლუბო ჩემპიონატი — სტრუქტურა და განვითარების სტრატეგია (ჭაბუკები)',
 'საკლუბო ჩემპიონატში მონაწილეობის პრინციპები, დოკუმენტაცია და საპრიზო ფონდის განაწილება.',
 '/regulations/club-cadet.pdf', 'საკლუბო-ჩემპიონატი-ჭაბუკები.pdf', 6),

('საკლუბო ჩემპიონატი — სტრუქტურა და განვითარების სტრატეგია (უფროსები)',
 'გუნდების დაკომპლექტების წესი, საკვალიფიკაციო/ფინალური ეტაპები და დაფინანსება.',
 '/regulations/club-project.pdf', 'საკლუბო-ჩემპიონატი-უფროსები.pdf', 7),

('ზონალური წარმომადგენლობების შექმნისა და საქმიანობის შესახებ',
 'აღმოსავლეთ და დასავლეთ საქართველოს ზონალური წარმომადგენლობების სტრუქტურა და არჩევის წესი.',
 '/regulations/zonaluri.pdf', 'ზონალური-წარმომადგენლობა.pdf', 8),

('სხვა ქვეყნის სახელით გამოსვლა — 2019 წლის ცვლილება',
 'აღმასრულებელი კომიტეტის მიერ 2019 წლის 21 იანვრიდან ძალაში შესული განახლებული წესი.',
 '/regulations/sxva_saxelit.pdf', 'სხვა-ქვეყნის-სახელით-2019.pdf', 9),

('აღმასკომის დადგენილება ფინანსური სახსრების გამოყენების შესახებ',
 'ეროვნულ ნაკრებთან დაკავშირებული ფინანსური რესურსების განაწილება და საკლუბო ჩემპიონატის საპრიზო ფონდი.',
 '/regulations/2019_01_22-dadgenileba_xarjebi.pdf', 'დადგენილება-ხარჯები-2019.pdf', 10);

select count(*) as regulations_count from regulations;

-- ძველი placeholder ჩანაწერი "დებულებები"-სთვის აღარ საჭირო (ახლა ცალკე regulations ცხრილს იყენებს)
delete from pages where slug = 'federation-regulations';
