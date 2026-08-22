create table if not exists staff_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  photo_url text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table staff_members enable row level security;
drop policy if exists "public read staff_members" on staff_members;
create policy "public read staff_members" on staff_members for select using (true);

insert into staff_members (name, role, sort_order) values
('ლევან ნოზაძე', 'პრეზიდენტი', 1),
('სლავა შერაზადიშვილი', 'საპატიო პრეზიდენტი', 2),
('დავით ქევხიშვილი', 'პირველი ვიცე-პრეზიდენტი', 3),
('გიორგი ათაბეგაშვილი', 'ვიცე-პრეზიდენტი', 4),
('ირინე გულიაშვილი', 'გენერალური მდივანი', 5),
('ანატოლი ავაზნელი', 'პრეზიდენტის ასისტენტი ევროპის ძიუდოს კავშირთან ურთიერთობაში', 6),
('ზურაბ უსუფაშვილი', 'სპორტული დირექტორი', 7),
('ირინა საყვარელიძე', 'საერთაშორისო ურთიერთობა', 8),
('ინგა რაზმაძე', 'მთავარი ბუღალტერი', 9);

select count(*) as staff_count from staff_members;
