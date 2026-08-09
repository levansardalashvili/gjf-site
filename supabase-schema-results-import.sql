-- results ცხრილს ემატება ველი გარე ბმულისთვის (judomanager.com-ის რეალური ბადეები)
alter table results add column if not exists source_url text;

-- 38 ტურნირი: საქართველო / უფროსები (gjf.ge/geo/results/georgian_results/standart-დან)
-- შენიშვნა: weight/athlete/medal ცარიელია, რადგან gjf.ge თავად არ ინახავს ამ დონის დეტალებს —
-- მხოლოდ ტურნირის სახელი/თარიღი და ბმული სრულ შედეგებზე.
insert into results (category, age_group, event_name, event_date, athlete, source_url) values
('georgia', 'standart', '2026 საქართველოს ჩემპიონატი - II დონე', '2026', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1669'),
('georgia', 'standart', '2025 საქართველოს ჩემპიონატი', '2025', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1662'),
('georgia', 'standart', '2025 მასტერსი - საქართველო', '2025', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1656'),
('georgia', 'standart', '2025 საქართველოს ჩემპიონატი - II დონე', '2025', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1627'),
('georgia', 'standart', '2024 საქართველოს ჩემპიონატი', '2024', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1621'),
('georgia', 'standart', '2024 საქართველოს ჩემპიონატი - II დონე', '2024', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1565'),
('georgia', 'standart', '2023 საქართველოს ჩემპიონატი', '2023', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1534'),
('georgia', 'standart', '2023 საქართველოს ჩემპიონატი - II დონე', '2023', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1472'),
('georgia', 'standart', '2022 საქართველოს ჩემპიონატი', '2022', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1429'),
('georgia', 'standart', '2022 საქართველოს ჩემპიონატი - II დონე', '2022', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1369'),
('georgia', 'standart', '2021 საქართველოს ჩემპიონატი', '2021', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1323'),
('georgia', 'standart', '2020 საქართველოს ჩემპიონატი - II დონე', '2020', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1231'),
('georgia', 'standart', '2019 საქართველოს ჩემპიონატი', '2019', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1192'),
('georgia', 'standart', '2019 საქართველოს ჩემპიონატი - სალიცენზიო', '2019', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1190'),
('georgia', 'standart', '2019 საქართველოს ჩემპიონატი - II დონე', '2019', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1125'),
('georgia', 'standart', '2018 საქართველოს ჩემპიონატი', '2018', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1065'),
('georgia', 'standart', '2018 საქართველოს ჩემპიონატი - სალიცენზიო', '2018', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=1058'),
('georgia', 'standart', '2018 საქართველოს ჩემპიონატი - II დონე', '2018', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=989'),
('georgia', 'standart', '2017 საქართველოს ჩემპიონატი', '2017', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=943'),
('georgia', 'standart', '2017 საქართველოს ჩემპიონატი - სალიცენზიო', '2017', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=938'),
('georgia', 'standart', '2017 საქართველოს საკლუბო ჩემპიონატი', '2017', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=878'),
('georgia', 'standart', '2017 საქართველოს ჩემპიონატი - II დონე', '2017', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=848'),
('georgia', 'standart', '2016 საქართველოს საკლუბო ჩემპიონატი', '2016', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=813'),
('georgia', 'standart', '2016 საქართველოს ჩემპიონატი', '2016', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=810'),
('georgia', 'standart', '2016 საქართველოს საკლუბო ჩემპიონატი', '2016', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=759'),
('georgia', 'standart', '2016 საქართველოს ჩემპიონატი - II დონე', '2016', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=734'),
('georgia', 'standart', '2015 საქართველოს ჩემპიონატი', '2015', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=666'),
('georgia', 'standart', '2014 საქართველოს ჩემპიონატი', '2014', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=499'),
('georgia', 'standart', '2013 საქართველოს ჩემპიონატი - ქალები', '2013', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=359'),
('georgia', 'standart', '2013 საქართველოს ჩემპიონატი', '2013', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=336'),
('georgia', 'standart', '2012 საქართველოს ჩემპიონატი', '2012', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=86'),
('georgia', 'standart', '2012 ეროვნული სარეიტინგო ტურნირი -1', '2012', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=88'),
('georgia', 'standart', '2011 საქართველოს ჩემპიონატი', '2011', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=91'),
('georgia', 'standart', '2010 საქართველოს ჩემპიონატი', '2010', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=93'),
('georgia', 'standart', '2009 საქართველოს ჩემპიონატი', '2009', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=272'),
('georgia', 'standart', '2008 საქართველოს ჩემპიონატი', '2008', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=271'),
('georgia', 'standart', '2007 საქართველოს ჩემპიონატი', '2007', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=270'),
('georgia', 'standart', '2006 საქართველოს ჩემპიონატი', '2006', '—', 'https://gjf.ge/geo/results/georgian_results/standart?info_id=100');

select count(*) as results_count from results;
