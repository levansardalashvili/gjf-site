create table if not exists regions (
  id bigint generated always as identity primary key,
  name text not null,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table regions enable row level security;
drop policy if exists "public read regions" on regions;
create policy "public read regions" on regions for select using (true);

insert into regions (name, sort_order) values
('თბილისი', 1),
('კახეთი', 2),
('იმერეთი', 3),
('ქვემო ქართლი', 4),
('შიდა ქართლი', 5),
('აჭარა', 6),
('მცხეთა-მთიანეთი', 7),
('რაჭა-ლეჩხუმი-ქვემო სვანეთი', 8),
('სამეგრელო-ზემო სვანეთი', 9),
('სამცხე-ჯავახეთი', 10),
('გურია', 11),
('აფხაზეთი', 12),
('სამხრეთ ოსეთი', 13);

select count(*) as regions_count from regions;
