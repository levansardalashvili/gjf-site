-- ეს სკრიპტი ერთხელ უნდა გაუშვა Supabase-ის დაშბორდში: SQL Editor -> New query -> Run

create table news (
  id bigint generated always as identity primary key,
  slug text unique not null,
  date text not null,
  title text not null,
  medal text,
  featured boolean default false,
  excerpt text,
  body text,
  created_at timestamp with time zone default now()
);

create table events (
  id bigint generated always as identity primary key,
  slug text unique not null,
  day text not null,
  month text not null,
  date_range text not null,
  tag text not null,
  title text not null,
  location text not null,
  category text not null, -- 'georgia' | 'international'
  description text,
  created_at timestamp with time zone default now()
);

create table clubs (
  id bigint generated always as identity primary key,
  name text not null,
  location text not null,
  region text not null,
  members integer default 0,
  created_at timestamp with time zone default now()
);

-- საჯარო კითხვის უფლება (საიტს შეუძლია წაკითხვა ავტორიზაციის გარეშე)
alter table news enable row level security;
alter table events enable row level security;
alter table clubs enable row level security;

create policy "public read news" on news for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read clubs" on clubs for select using (true);

-- ჩაწერა/რედაქტირება/წაშლა ხდება მხოლოდ admin API route-იდან,
-- რომელიც service-role key-ს იყენებს და ამ policy-ებს გვერდს უვლის.

-- საწყისი მონაცემები (იგივე, რაც lib/data.js-ში იყო)
insert into news (slug, date, title, medal, featured, excerpt, body) values
('european-championship-best-result-2026', '28 ივლისი 2026', 'საუკეთესო შედეგი ევროპის ჩემპიონატზე', '🥇 ოქრო', true,
 'საქართველოს ნაკრებმა ევროპის ჩემპიონატზე ისტორიაში საუკეთესო შედეგი აჩვენა.',
 'საქართველოს ჯუდოს ნაკრებმა თბილისში გამართულ ევროპის ჩემპიონატზე ფედერაციის ისტორიაში ერთ-ერთი საუკეთესო შედეგი აჩვენა.'),
('luka-maisuradze-gold-european-championship', '27 ივლისი 2026', 'ლუკა მაისურაძის ოქრო ევროპის ჩემპიონატზე', '🥇 ოქრო', false,
 '-73 კგ წონით კატეგორიაში ლუკა მაისურაძემ ოქროს მედალი მოიპოვა.',
 '-73 კგ წონით კატეგორიაში ლუკა მაისურაძემ ფინალში დამაჯერებელი გამარჯვებით მოიპოვა ოქროს მედალი.'),
('u23-european-champion-2026', '24 ივლისი 2026', 'საქართველოს ნაკრები 23 წლამდელთა ევროპის ჩემპიონია', null, false,
 'ახალგაზრდულმა ნაკრებმა გუნდურ ჩემპიონატში პირველი ადგილი დაიკავა.',
 'საქართველოს 23 წლამდელთა ნაკრებმა გუნდურ ჩემპიონატში ევროპის ჩემპიონის წოდება მოიპოვა.');

insert into events (slug, day, month, date_range, tag, title, location, category, description) values
('european-championship-tbilisi-2026', '16', 'აპრ', '16-19 აპრილი 2026', 'საერთაშორისო', 'ევროპის ჩემპიონატი', 'თბილისი, საქართველო', 'international',
 'ევროპის კონტინენტური ჩემპიონატი, სადაც მონაწილეობს 40+ ქვეყნის ნაკრები.'),
('tbilisi-grand-slam-2026', '20', 'მარ', '20-22 მარტი 2026', 'გრან სლემი', 'თბილისის გრან სლემი', 'თბილისი, საქართველო', 'international',
 'IJF-ის ყოველწლიური გრან სლემის ტურნირი თბილისში.'),
('georgia-national-championship-2026', '25', 'დეკ', '25-27 დეკემბერი 2026', 'ეროვნული', 'საქართველოს ჩემპიონატი', 'თბილისი', 'georgia',
 'საქართველოს ეროვნული ჩემპიონატი უფროსებში.');

insert into clubs (name, location, region, members) values
('ჯუდო კლუბი „დინამო“', 'თბილისი, საბურთალო', 'თბილისი', 120),
('ჯუდო კლუბი „იმერეთი“', 'ქუთაისი', 'იმერეთი', 85),
('საბავშვო სპორტული სკოლა №3', 'ბათუმი, აჭარა', 'აჭარა', 64),
('ჯუდო კლუბი „ალაზანი“', 'თელავი, კახეთი', 'კახეთი', 40),
('ჯუდო კლუბი „ეგრისი“', 'ზუგდიდი, სამეგრელო', 'სამეგრელო', 33);

-- დამატებითი ცხრილები: გვერდების კონტენტი (ფედერაცია/ისტორია) და ნაკრების შემადგენლობა

create table pages (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  body text,
  updated_at timestamp with time zone default now()
);

create table team_members (
  id bigint generated always as identity primary key,
  category text not null, -- 'standart' | 'youth' | 'kids' | 'women'
  weight text not null,
  name text not null,
  created_at timestamp with time zone default now()
);

alter table pages enable row level security;
alter table team_members enable row level security;
create policy "public read pages" on pages for select using (true);
create policy "public read team_members" on team_members for select using (true);

insert into pages (slug, title, body) values
('federation-staff', 'შემადგენლობა', 'ფედერაციის ხელმძღვანელობისა და თანამშრომლების სია დაემატება მალე.'),
('federation-committee', 'აღმასკომი', 'აღმასრულებელი კომიტეტის შემადგენლობა და გადაწყვეტილებები.'),
('federation-commissions', 'კომისიები', 'სპეციალიზებული კომისიები — მსაჯთა, სამედიცინო, დისციპლინური.'),
('federation-structure', 'სტრუქტურა', 'ფედერაციის ორგანიზაციული სტრუქტურა.'),
('federation-statute', 'წესდება', 'ფედერაციის ოფიციალური წესდება.'),
('federation-regions', 'რეგიონები', 'საქართველოს 9 რეგიონული ორგანიზაცია.'),
('federation-projects', 'პროექტები', 'ფედერაციის მიმდინარე განვითარების პროექტები.'),
('judo-history', 'ძიუდოს განვითარების ისტორია', 'ჯუდოს განვითარების ისტორია საქართველოში.'),
('judo-archive', 'არქივი', 'ისტორიული მასალების არქივი.'),
('judo-statistic', 'სტატისტიკა', 'ისტორიული სტატისტიკური მონაცემები.');

insert into team_members (category, weight, name) values
('standart', '-60 კგ', 'სახელი გვარი'),
('standart', '-66 კგ', 'სახელი გვარი'),
('standart', '-73 კგ', 'ლუკა მაისურაძე'),
('women', '-52 კგ', 'სახელი გვარი'),
('women', '-57 კგ', 'ეთერ ლიპარტელიანი');

-- PDF/დოკუმენტის ატვირთვის მხარდაჭერისთვის
alter table pages add column file_url text;
alter table pages add column file_name text;

-- სიახლის ფოტოსთვის
alter table news add column image_url text;

-- პროექტები (ფედერაცია → პროექტები), ბარათების სახით
create table projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  date text,
  image_url text,
  body text,
  created_at timestamp with time zone default now()
);

alter table projects enable row level security;
create policy "public read projects" on projects for select using (true);

-- gjf.ge-ს "პროექტები" გვერდიდან წამოღებული რეალური სათაურები (საწყისი მონაცემები)
insert into projects (slug, title, date, body) values
('flexible-path-to-success', 'მომავალი — JUDO მოქნილი გზა — წარმატებისკენ', '', 'დეტალური აღწერა დასამატებელია.'),
('flexible-path-to-success-exams', 'მომავალი — JUDO მოქნილი გზა — წარმატებისკენ — გამოცდები', '', 'დეტალური აღწერა დასამატებელია.'),
('kids-exam-system-coach-authority', 'საგამოცდო სისტემა ჭაბუკ ძიუდოისტებში და პირადი მწვრთნელებისთვის უფლებამოსილების განაწილება სანაკრებო დონეზე', '', 'დეტალური აღწერა დასამატებელია.'),
('national-team-salary-by-ranking', 'ძიუდოს ეროვნული ნაკრების წევრების სახელფასო ანაზღაურება მსოფლიო რეიტინგში მათ მიერ დაკავებული პოზიციის შესაბამისად', '', 'დეტალური აღწერა დასამატებელია.'),
('million-gel-to-personal-coaches', 'მილიონი ლარი პირად მწვრთნელებს', '', 'დეტალური აღწერა დასამატებელია.'),
('competition-participation-requirements', 'მოთხოვნები შეჯიბრებებში მონაწილეობისთვის', '', 'დეტალური აღწერა დასამატებელია.');

-- ფედერაციის პროექტები (gjf.ge/geo/federation/projects-დან წამოღებული საწყისი მონაცემები)
create table projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  image_url text,
  excerpt text,
  body text,
  file_url text,
  file_name text,
  created_at timestamp with time zone default now()
);

alter table projects enable row level security;
create policy "public read projects" on projects for select using (true);

insert into projects (slug, title, excerpt, body, file_url, file_name) values
('judo-flexible-path-project', 'მომავალი - JUDO მოქნილი გზა - წარმატებისკენ',
 'მწვრთნელ-კურატორთა გადამზადების საგანმანათლებლო პროგრამა, ლექციებისა და ახსნა-განმარტებითი მასალების სერიით.',
 'პროექტი მოიცავს მწვრთნელ-კურატორთა გადამზადების მრავალსაფეხურიან კურსს (13 გაკვეთილი) თანდართული ახსნა-განმარტებითი ბარათებით.',
 'https://gjf.ge/arqivi/2021-proeqti-judo.pdf', 'პროექტის დოკუმენტი'),

('exam-system-cadets', 'საგამოცდო სისტემა ჭაბუკ ძიუდოისტებში და პირადი მწვრთნელებისთვის უფლებამოსილების განაწილება სანაკრებო დონეზე',
 'მოქმედი წესები ჭაბუკთა საგამოცდო სისტემისა და პირადი მწვრთნელების უფლებამოსილების შესახებ.',
 null,
 'http://gjf.ge/arqivi/mcvrtnelebi1.pdf', 'პროექტის დოკუმენტი'),

('national-team-ranking-salary', 'ძიუდოს ეროვნული ნაკრების წევრების სახელფასო ანაზღაურება მსოფლიო რეიტინგში მათ მიერ დაკავებული პოზიციის შესაბამისად',
 'პრინციპები, რომლის მიხედვითაც ნაკრების წევრების ანაზღაურება მათ მსოფლიო რეიტინგში დაკავებულ პოზიციაზეა დამოკიდებული.',
 null,
 'http://gjf.ge/arqivi/reitingi1.pdf', 'პროექტის დოკუმენტი'),

('judo-flexible-path-exams', 'მომავალი - JUDO მოქნილი გზა - წარმატებისკენ - გამოცდები',
 'საგამოცდო ბილეთების საფუძველი — მასალა, რომლის მიხედვითაც ფასდებიან ძიუდოისტები.',
 'ძიუდოისტს მოეთხოვება ცოდნა სამ კომპონენტში: ძირითადი ტერმინოლოგია და მოძრაობები, ტექნიკა დგომში და ქვეჭიდში, და ნაგენოკატა. გამოცდების ჩაბარება სავალდებულოა.',
 'http://gjf.ge/arqivi/1-sackisi.pdf', 'ტერმინოლოგიის მასალა'),

('million-lari-personal-coaches', 'მილიონი ლარი პირად მწვრთნელებს',
 'პროექტი პირადი მწვრთნელების დაფინანსების მხარდასაჭერად.',
 null,
 'https://gjf.ge/arqivi/milioni-lari.pdf', 'პროექტის დოკუმენტი'),

('competition-participation-requirements', 'მოთხოვნები შეჯიბრებებში მონაწილეობისთვის',
 'ასაკობრივი მოთხოვნები და საკვალიფიკაციო კომპონენტები ტურნირებში მონაწილეობის მისაღებად.',
 '11-12 და 13-14 წლის ასაკობრივი ჯგუფებისთვის ცალკე მოთხოვნებია განსაზღვრული. 15-17 წლისთვის დამატებით მოეთხოვებათ ცოდნა ტერმინოლოგიაში, ტექნიკასა და ნაგენოკატაში.',
 'https://gjf.ge/arqivi/motxovna-11-12.pdf', 'მოთხოვნები 11-12 წლის ასაკისთვის');

-- პროექტებს ახლა calling own ცხრილი (projects) მართავს pages-ის ნაცვლად —
-- ძველი placeholder ჩანაწერი აღარ არის საჭირო
delete from pages where slug = 'federation-projects';
