-- მთავარი გვერდის "Portal" ბლოკი (Judomanager პორტალი/ადმინი/მედია) — admin-იდან მართვადი
create table if not exists portal_links (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  url text not null,
  logo_url text,
  logo_bg text default 'white',  -- 'white' | 'dark' | 'none'
  sort_order integer default 100,
  created_at timestamp with time zone default now()
);

alter table portal_links enable row level security;
drop policy if exists "public read portal_links" on portal_links;
create policy "public read portal_links" on portal_links for select using (true);

insert into portal_links (title, description, url, logo_url, logo_bg, sort_order) values
('Portal Judomanager', 'ტურნირების ოფიციალური შედეგები და რეიტინგები', 'https://portal.judomanager.com/gjf', '/logos/jm-portal-black.svg', 'white', 1),
('Admin Judomanager', 'შეჯიბრებებზე რეგისტრაციის ადმინისტრირება', 'https://admin.judomanager.com/login', '/logos/jm-account-white.svg', 'dark', 2),
('მედია პორტალი', 'ვიდეო რეპორტაჟები YouTube არხზე', 'https://www.youtube.com/GeorgiaJudo', '/logos/youtube-icon.svg', 'none', 3);
