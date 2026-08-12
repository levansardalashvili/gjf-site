-- ალბომები (მაგ. "ევროპის ჩემპიონატი 2026") — მხოლოდ ფოტო გალერეისთვის
create table if not exists gallery_albums (
  id bigint generated always as identity primary key,
  title text not null,
  cover_image_url text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table gallery_albums enable row level security;
drop policy if exists "public read gallery_albums" on gallery_albums;
create policy "public read gallery_albums" on gallery_albums for select using (true);

-- ფოტოებს ვუმატებთ ალბომთან კავშირს (ვიდეოებს ეს არ ეხებათ, album_id ცარიელი დარჩება)
alter table gallery_items add column if not exists album_id bigint references gallery_albums(id) on delete cascade;
