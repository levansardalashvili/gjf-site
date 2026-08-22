create table if not exists committee_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text,
  photo_url text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table committee_members enable row level security;
drop policy if exists "public read committee_members" on committee_members;
create policy "public read committee_members" on committee_members for select using (true);

insert into committee_members (name, sort_order) values
('ლევან ნოზაძე', 1),
('დავით ქევხიშვილი', 2),
('გიორგი ათაბეგაშვილი', 3),
('დავით ბერძენიშვილი', 4),
('გოჩა ბერაძე', 5),
('ზვიად წოწკოლაური', 6),
('ხვიჩა ხუციშვილი', 7),
('აბესალომ წიკლაური', 8),
('ტარიელ შათირიშვილი', 9),
('ბადრი გახოკიძე', 10),
('ანზორ თენაძე', 11),
('დავით ქერაული', 12),
('ირინე გულიაშვილი', 13);

select count(*) as committee_count from committee_members;
