create table if not exists structure_nodes (
  id bigint generated always as identity primary key,
  label text not null,           -- პოზიციის/ორგანოს დასახელება
  person_name text,              -- სახელი გვარი (არასავალდებულო)
  row_order integer,             -- მთავარი ხაზის (spine) რიგითობა 1,2,3... — თუ ცარიელია, ეს გვერდითი ყუთია
  attach_to_row integer,         -- გვერდითი ყუთისთვის: რომელ row_order-ს ერთვის
  sort_order integer default 100,-- გვერდითი ყუთების თანმიმდევრობა ერთ row-ში
  created_at timestamp with time zone default now()
);

alter table structure_nodes enable row level security;
drop policy if exists "public read structure_nodes" on structure_nodes;
create policy "public read structure_nodes" on structure_nodes for select using (true);

-- მთავარი ხაზი (spine)
insert into structure_nodes (label, person_name, row_order, sort_order) values
('ყრილობა', null, 1, 1),
('პრეზიდენტი', 'ლევან ნოზაძე', 2, 1),
('პირველი ვიცე-პრეზიდენტი', 'დავით ქევხიშვილი', 3, 1),
('ვიცე-პრეზიდენტი', null, 4, 1),
('ვიცე-პრეზიდენტი', null, 5, 1),
('ვიცე-პრეზიდენტი', null, 6, 1),
('ვიცე-პრეზიდენტი', null, 7, 1),
('სპორტული დირექტორი', null, 8, 1),
('ადმინისტრაციული დირექტორი', null, 9, 1);

-- გვერდითი ყუთები (branches)
insert into structure_nodes (label, row_order, attach_to_row, sort_order) values
('აღმასრულებელი კომიტეტი', null, 1, 1),
('გენერალური მდივანი', null, 2, 1),
('საერთაშორისო ურთიერთობები', null, 2, 2),
('ფინანსური განყოფილება', null, 2, 3),
('მწვრთნელთა პროფესიული განვითარება', null, 3, 1),
('განათლების პროგრამები', null, 3, 2),
('რეგიონული ჯუდოს განვითარება', null, 4, 1),
('მასობრიობის განვითარება', null, 4, 2),
('ბავშვთა ჯუდოს განვითარება', null, 5, 1),
('სპონსორებთან ურთიერთობა და მოძიება', null, 5, 2),
('საკლუბო ჯუდოს განვითარება', null, 6, 1),
('ადგილობრივი და საერთაშორისო ტურნირების ორგანიზება', null, 7, 1),
('მასმედიასთან და საზოგადოებასთან ურთიერთობა', null, 8, 1),
('საკომისიო საქმიანობის ზედამხედველობა', null, 8, 2),
('საწვრთნელი ბაზების საქმიანობა', null, 8, 3),
('შიდა ჩემპიონატების ორგანიზების პროტოკოლის უზრუნველყოფა', null, 9, 1),
('ფინანსური საკითხების და სპონსორების მოძიება', null, 9, 2);

select count(*) as structure_count from structure_nodes;
