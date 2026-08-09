-- შედეგები
create table if not exists results (
  id bigint generated always as identity primary key,
  category text not null, -- 'georgia' | 'international'
  tournament text not null,
  athlete text not null,
  weight text,
  medal text not null, -- მაგ: 🥇 ოქრო
  date text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);
alter table results enable row level security;
drop policy if exists "public read results" on results;
create policy "public read results" on results for select using (true);

-- ფოტო გალერეა
create table if not exists gallery_photos (
  id bigint generated always as identity primary key,
  image_url text not null,
  caption text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);
alter table gallery_photos enable row level security;
drop policy if exists "public read gallery_photos" on gallery_photos;
create policy "public read gallery_photos" on gallery_photos for select using (true);

-- ვიდეო გალერეა
create table if not exists gallery_videos (
  id bigint generated always as identity primary key,
  title text not null,
  youtube_url text not null,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);
alter table gallery_videos enable row level security;
drop policy if exists "public read gallery_videos" on gallery_videos;
create policy "public read gallery_videos" on gallery_videos for select using (true);

-- კონტაქტის გვერდი (pages ცხრილს იზიარებს, isnstead of ცალკე ცხრილი)
insert into pages (slug, title, body)
values ('contact-info', 'კონტაქტი', 'თბილისი, საქართველო
info@gjf.ge
Facebook / YouTube')
on conflict (slug) do nothing;
