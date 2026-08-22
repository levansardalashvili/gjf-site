-- ერთი, "სინგლტონ" ჩანაწერი — ლაივის მდგომარეობა
create table if not exists live_broadcast (
  id bigint generated always as identity primary key,
  is_live boolean default false,
  tournament_name text,
  youtube_url text,
  photo_url text,
  updated_at timestamp with time zone default now()
);
alter table live_broadcast enable row level security;
create policy "public read live_broadcast" on live_broadcast for select using (true);

insert into live_broadcast (is_live) select false where not exists (select 1 from live_broadcast);
