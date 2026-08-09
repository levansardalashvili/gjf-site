insert into pages (slug, title, body) values
('federation-regulations', 'დებულებები', 'ფედერაციის დებულებების ტექსტი დაემატება მალე.')
on conflict (slug) do nothing;
