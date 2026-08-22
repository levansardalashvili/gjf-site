-- საკონტაქტო ფორმიდან მიღებული შეტყობინებები
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

alter table contact_messages enable row level security;
-- საჯარო წაკითხვა არ სჭირდება — მხოლოდ admin კითხულობს, დამატება კი API route-იდან (service_role) ხდება
