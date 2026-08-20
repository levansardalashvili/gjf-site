-- თუ წინა SQL (supabase-schema-enable-realtime.sql) უკვე გაუშვი,
-- ეს გამორთავს Realtime-ს "results" ცხრილისთვის.
-- თუ წინა SQL საერთოდ არ გაშვებულა, ეს ფაილიც არ არის საჭირო.
alter publication supabase_realtime drop table results;
