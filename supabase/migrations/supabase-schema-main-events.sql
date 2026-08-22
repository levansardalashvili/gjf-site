-- "მთავარი ღონისძიება" ველი — admin-იდან მონიშვნადი, მთავარ გვერდზე გამოსაჩენად
alter table events add column if not exists is_main_event boolean default false;
