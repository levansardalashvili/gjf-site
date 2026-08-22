-- სოც. ქსელების ბმულები (admin-იდან სრულად მართვადი)
create table if not exists social_links (
  id bigint generated always as identity primary key,
  platform text not null,   -- 'facebook' | 'instagram' | 'youtube' | 'other'
  url text not null,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table social_links enable row level security;
drop policy if exists "public read social_links" on social_links;
create policy "public read social_links" on social_links for select using (true);

insert into social_links (platform, url, sort_order) values
('facebook', 'https://www.facebook.com/GeorgianJudoFederation', 1),
('instagram', 'https://www.instagram.com/georgianjudofederation/', 2),
('youtube', 'https://www.youtube.com/GeorgiaJudo', 3);

-- ტელეფონის ველი (contact გვერდზე ჩანს, admin-ის contact სექციაშივე მართვადია)
insert into pages (slug, title, body) values
('contact-phone', 'ტელეფონი', '+995 32 251 64 66')
on conflict (slug) do nothing;
