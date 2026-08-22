create table if not exists calendar_regulations (
  id bigint generated always as identity primary key,
  title text not null,
  excerpt text,
  file_url text,
  file_name text,
  force_download boolean default false,
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table calendar_regulations enable row level security;
drop policy if exists "public read calendar_regulations" on calendar_regulations;
create policy "public read calendar_regulations" on calendar_regulations for select using (true);

insert into calendar_regulations (title, excerpt, file_url, file_name, force_download, sort_order) values
('საწევრო შენატანის დებულება',
 'საწევრო შენატანის (100 ლარი) გადახდის წესი ფედერაციის ღონისძიებებში მონაწილეობისთვის — ვალდებულია პირადი მწვრთნელი.',
 '/regulations/m-sacevro-debuleba.pdf', 'საწევრო-დებულება.pdf', false, 1),

('საწევრო შენატანის სარეგისტრაციო ფორმა',
 'ფორმა შეჯიბრში, სემინარსა თუ სხვა ღონისძიებაში მონაწილეობისთვის საწევროს რეგისტრაციისთვის.',
 '/regulations/m-sacevro-saregistracio.pdf', 'საწევრო-სარეგისტრაციო-ფორმა.pdf', false, 2),

('საწევროს ავტომატური ჩამოტვირთვა',
 'სარეგისტრაციო ფორმის Excel ვერსია — დააჭირე, რომ პირდაპირ ჩამოიტვირთოს.',
 '/regulations/m-sacevro-saregistracio.xlsx', 'საწევრო-სარეგისტრაციო-ფორმა.xlsx', true, 3),

('საბანკო რეკვიზიტები',
 'საქართველოს ძიუდოს ეროვნული ფედერაციის ანგარიშზე თანხის ჩარიცხვისთვის საჭირო რეკვიზიტები.',
 '/regulations/m-gjf-account.pdf', 'საბანკო-რეკვიზიტები.pdf', false, 4);

select count(*) as calendar_regulations_count from calendar_regulations;
