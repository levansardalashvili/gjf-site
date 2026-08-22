-- React (Vite) ვერსიისთვის — ახლა "წერა" (დამატება/რედაქტირება/წაშლა) ხდება
-- პირდაპირ ბრაუზერიდან (anon გასაღებით), არა სერვერიდან (service_role).
-- ამიტომ საჭიროა ცალკე წესები, რომლებიც მხოლოდ შესულ (authenticated) მომხმარებელს
-- აძლევს დამატების/შეცვლის/წაშლის უფლებას.

create policy "authenticated can insert news" on news for insert to authenticated with check (true);
create policy "authenticated can update news" on news for update to authenticated using (true);
create policy "authenticated can delete news" on news for delete to authenticated using (true);

-- ფაილების (ფოტოების) ატვირთვისთვისაც იგივე წესია საჭირო
create policy "authenticated can upload documents" on storage.objects for insert to authenticated with check (bucket_id = 'documents');
create policy "authenticated can update documents" on storage.objects for update to authenticated using (bucket_id = 'documents');
create policy "authenticated can delete documents" on storage.objects for delete to authenticated using (bucket_id = 'documents');
