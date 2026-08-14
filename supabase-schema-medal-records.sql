-- მედლების სტატისტიკა (ოლიმპიადა/მსოფლიო/ევროპის ჩემპიონატები) — admin-იდან მართვადი
create table if not exists medal_records (
  id bigint generated always as identity primary key,
  athlete_name text not null,
  olympic_gold text,
  olympic_silver text,
  olympic_bronze text,
  world_gold text,
  world_silver text,
  world_bronze text,
  european_gold text,
  european_silver text,
  european_bronze text,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table medal_records enable row level security;
drop policy if exists "public read medal_records" on medal_records;
create policy "public read medal_records" on medal_records for select using (true);
