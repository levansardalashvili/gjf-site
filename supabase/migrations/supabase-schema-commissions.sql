create table if not exists commissions_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  photo_url text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table commissions_members enable row level security;
drop policy if exists "public read commissions_members" on commissions_members;
create policy "public read commissions_members" on commissions_members for select using (true);

insert into commissions_members (name, role, sort_order) values
('ზაქრო კევლიშვილი', 'კომისიების გენერალური დირექტორი', 1),
('ალექსი დავითაშვილი', 'სპორტი ყველასთვის', 2),
('ზაზა გულბიანი', 'საორგანიზაციო-მეთოდური', 3),
('დავით ტენტერაშვილი', 'დისციპლინარული-სააპელაციო', 4),
('გიორგი ბერუაშვილი', 'საშეჯიბრო', 5),
('მერაბ ლოსეურაშვილი', 'სამსაჯო', 6),
('შოთა ჯავახაძე', 'საერთაშორისო ურთიერთობების', 7),
('ალექსანდრე მამუკიშვილი', 'სპორტსმენთა', 8),
('ვახტანგ ზოიძე', 'სპორტსმენთა', 9),
('ბერდია გუგავა', 'ვეტერანთა', 10),
('ოლეგ ზურაბიანი', 'ვეტერანთა', 11),
('ლაშა ალადოშვილი', 'სამეცნიერო და სამედიცინო', 12),
('ბიძინა სამუკაშვილი', 'კომერციული და მარკეტინგის', 13),
('ვაჟა ბალხამიშვილი', 'საგამოცდო', 14);

select count(*) as commissions_count from commissions_members;
