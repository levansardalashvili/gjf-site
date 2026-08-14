-- Admin-ის მოქმედებების ისტორია (ვინ, როდის, რა შეცვალა)
create table if not exists activity_log (
  id bigint generated always as identity primary key,
  admin_email text,
  method text,
  path text,
  created_at timestamp with time zone default now()
);

alter table activity_log enable row level security;
-- საჯარო წაკითხვა არ სჭირდება — მხოლოდ service_role წერს/კითხულობს (admin გვერდიდან)
