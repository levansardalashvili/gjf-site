-- supabase-schema-react-write-policies.sql-ით შექმნილი policy-ები ძველი,
-- React (Vite) ვერსიის ნარჩენია — მაშინ ბრაუზერიდან პირდაპირ (anon/authenticated
-- გასაღებით) ხდებოდა ჩაწერა. ამჟამინდელი Next.js აპლიკაცია ყველა ჩაწერას
-- service_role-ით, სერვერის API route-ებიდან აკეთებს (რომელიც RLS-ს გვერდს
-- უვლის) — ანუ ეს policy-ები აღარაფრისთვის აღარ არის საჭირო.
--
-- ⚠️ სანამ ამას გაუშვებ: სანამ ეს ჯერ არსებობს, ნებისმიერ "authenticated"
-- Supabase მომხმარებელს (ანუ ვინც კი შესულია — არა მხოლოდ admin-ს) შეუძლია
-- პირდაპირ, admin პანელის/middleware-ის/CSRF-ის/სანიტაიზაციის გვერდის ავლით,
-- Supabase REST API-ზე პირდაპირი მოთხოვნით (საჯარო anon key + საკუთარი login)
-- დაამატოს/შეცვალოს/წაშალოს ჩანაწერი news ცხრილში, და ატვირთოს/წაშალოს
-- ფაილი "documents" storage bucket-ში.
--
-- ეს განსაკუთრებით საშიშია, თუ Supabase პროექტში public sign-up ჩართულია
-- (Authentication → Providers → Email → "Allow new users to sign up") —
-- მაშინ ნებისმიერს, ინტერნეტიდან, შეუძლია უფასო ანგარიშის შექმნა და ამ
-- policy-ების გამოყენება. შეამოწმე და გამორთე public sign-up, თუ ჩართულია.

drop policy if exists "authenticated can insert news" on news;
drop policy if exists "authenticated can update news" on news;
drop policy if exists "authenticated can delete news" on news;

drop policy if exists "authenticated can upload documents" on storage.objects;
drop policy if exists "authenticated can update documents" on storage.objects;
drop policy if exists "authenticated can delete documents" on storage.objects;
