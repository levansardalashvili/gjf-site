-- პროექტების ინგლისური ვერსია
alter table projects add column if not exists title_en text;
alter table projects add column if not exists excerpt_en text;
alter table projects add column if not exists body_en text;

-- შედეგების (ღონისძიების სახელის) ინგლისური ვერსია
alter table results add column if not exists event_name_en text;
