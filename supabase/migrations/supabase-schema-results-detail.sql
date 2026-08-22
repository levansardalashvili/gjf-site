-- PDF/დოკუმენტის ატვირთვის მხარდაჭერა შედეგებზეც (იმავე პატერნით, რაც pages/projects-ზეა)
alter table results add column if not exists file_url text;
alter table results add column if not exists file_name text;

-- დადასტურებული რეალური ბმული (judomanager.com-ის პორტალი) 2026 წლის ტურნირისთვის
update results
set source_url = 'https://portal.judomanager.com/competition/ii_2026/draw/i/21984'
where event_name = '2026 საქართველოს ჩემპიონატი - II დონე' and category = 'georgia' and age_group = 'standart';

-- დანარჩენი 37 ჩანაწერისთვის gjf.ge-ს ბმული ამოვშალე, რადგან რეალურ შედეგებზე არ მიდიოდა —
-- ეს ველები ცარიელი დარჩება, სანამ admin-იდან არ დაემატება რეალური ბმული ან PDF
update results set source_url = null
where category = 'georgia' and age_group = 'standart'
  and event_name != '2026 საქართველოს ჩემპიონატი - II დონე';
