-- უსაფრთხო ვერსია: შეიძლება რამდენჯერაც გინდა, იმდენჯერ გაუშვა,
-- არასდროს მოგცემს "already exists" შეცდომას.

create table if not exists projects (
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

drop policy if exists "public read projects" on projects;
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
 'https://gjf.ge/arqivi/motxovna-11-12.pdf', 'მოთხოვნები 11-12 წლის ასაკისთვის')
on conflict (slug) do nothing;

delete from pages where slug = 'federation-projects';

select count(*) as projects_count from projects;
