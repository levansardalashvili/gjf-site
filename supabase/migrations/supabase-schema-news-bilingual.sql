-- სიახლეების ინგლისური ვერსია (არასავალდებულო — თუ ცარიელია, ქართული გამოჩნდება)
alter table news add column if not exists title_en text;
alter table news add column if not exists body_en text;
