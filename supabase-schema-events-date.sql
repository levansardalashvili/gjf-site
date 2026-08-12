-- ღონისძიების რეალური თარიღი დალაგებისთვის (day/month ტექსტური ველები საკმარისი არ იყო)
alter table events add column if not exists event_date date;

-- უკვე არსებული ჩანაწერების backfill: day + month (ქართული შემოკლება) + წელი 2026
-- (თუ სხვა წლის ღონისძიება გაქვს, ხელით შეასწორე event_date ველი admin-იდან)
update events set event_date = make_date(
  2026,
  case month
    when 'იან' then 1 when 'თებ' then 2 when 'მარ' then 3 when 'აპრ' then 4
    when 'მაი' then 5 when 'ივნ' then 6 when 'ივლ' then 7 when 'აგვ' then 8
    when 'სექ' then 9 when 'ოქტ' then 10 when 'ნოე' then 11 when 'დეკ' then 12
    else 1
  end,
  nullif(regexp_replace(day, '[^0-9]', '', 'g'), '')::int
)
where event_date is null and day ~ '[0-9]' and month is not null;
