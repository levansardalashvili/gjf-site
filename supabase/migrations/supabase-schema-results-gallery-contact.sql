-- შედეგები
create table if not exists results (
  id bigint generated always as identity primary key,
  category text not null,   -- 'georgia' | 'international'
  age_group text not null,  -- 'standart' | 'youth' | 'kids'
  event_name text not null,
  event_date text,
  weight text,
  athlete text not null,
  medal text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);
alter table results enable row level security;
drop policy if exists "public read results" on results;
create policy "public read results" on results for select using (true);

-- გალერეა (ფოტო + ვიდეო ერთ ცხრილში, type ველით)
create table if not exists gallery_items (
  id bigint generated always as identity primary key,
  type text not null, -- 'photo' | 'video'
  title text,
  image_url text,
  video_url text,
  views text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);
alter table gallery_items enable row level security;
drop policy if exists "public read gallery_items" on gallery_items;
create policy "public read gallery_items" on gallery_items for select using (true);

-- კონტაქტის ინფორმაცია (pages ცხრილს ემატება, უკვე არსებული სისტემით)
insert into pages (slug, title, body) values
('contact-address', 'მისამართი', 'თბილისი, საქართველო'),
('contact-email', 'ელფოსტა', 'info@gjf.ge'),
('contact-social', 'სოც. ქსელები', 'Facebook · YouTube')
on conflict (slug) do nothing;
