-- results ცხრილს აკლდა ეს სვეტები, თუმცა ფორმაში დიდი ხანია გამოიყენებოდა —
-- ამიტომ "Could not find the 'file_name' column" შეცდომა ჩნდებოდა.
alter table results add column if not exists source_url text;
alter table results add column if not exists file_url text;
alter table results add column if not exists file_name text;
