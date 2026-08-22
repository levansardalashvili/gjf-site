-- პარტნიორების ცხრილი
create table if not exists partners (
  id bigint generated always as identity primary key,
  name text not null,
  logo_url text not null,
  website_url text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table partners enable row level security;
drop policy if exists "public read partners" on partners;
create policy "public read partners" on partners for select using (true);

insert into partners (name, logo_url, website_url, sort_order) values
('LeaderBet', '/partners/leaderbet.jpg', null, 1),
('Adidas', '/partners/adidas.png', null, 2),
('IJF', '/partners/ijf.png', 'https://www.ijf.org', 3),
('European Judo Union', '/partners/eju.png', 'https://www.eju.net', 4),
('საქართველოს ეროვნული ოლიმპიური კომიტეტი', '/partners/seok.jpg', null, 5),
('ჯიუდოს განვითარების ფონდი', '/partners/judo-development-fund.png', null, 6),
('საქართველოს სპორტის სამინისტრო', '/partners/sports-ministry.jpg', null, 7)
on conflict do nothing;

select count(*) as partners_count from partners;
