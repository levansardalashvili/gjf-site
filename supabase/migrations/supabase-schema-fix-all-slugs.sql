-- ძველი ჩანაწერების slug-ები (spaces, ქართული ასოები) ლათინურ, სწორ URL-ებად

update news
set slug =
  regexp_replace(
    trim(both '-' from lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(news.slug,'ა','a'),'ბ','b'),'გ','g'),'დ','d'),'ე','e'),'ვ','v'),'ზ','z'),'თ','t'),'ი','i'),'კ','k'),'ლ','l'),'მ','m'),'ნ','n'),'ო','o'),'პ','p'),'ჟ','zh'),'რ','r'),'ს','s'),'ტ','t'),'უ','u'),'ფ','p'),'ქ','k'),'ღ','gh'),'ყ','q'),'შ','sh'),'ჩ','ch'),'ც','ts'),'ძ','dz'),'წ','ts'),'ჭ','ch'),'ხ','kh'),'ჯ','j'),'ჰ','h'))),
    '[^a-z0-9]+', '-', 'g'
  )
where slug ~ '[^a-zA-Z0-9-]' or slug ~ ' ';

update events
set slug =
  regexp_replace(
    trim(both '-' from lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(events.slug,'ა','a'),'ბ','b'),'გ','g'),'დ','d'),'ე','e'),'ვ','v'),'ზ','z'),'თ','t'),'ი','i'),'კ','k'),'ლ','l'),'მ','m'),'ნ','n'),'ო','o'),'პ','p'),'ჟ','zh'),'რ','r'),'ს','s'),'ტ','t'),'უ','u'),'ფ','p'),'ქ','k'),'ღ','gh'),'ყ','q'),'შ','sh'),'ჩ','ch'),'ც','ts'),'ძ','dz'),'წ','ts'),'ჭ','ch'),'ხ','kh'),'ჯ','j'),'ჰ','h'))),
    '[^a-z0-9]+', '-', 'g'
  )
where slug ~ '[^a-zA-Z0-9-]' or slug ~ ' ';

update projects
set slug =
  regexp_replace(
    trim(both '-' from lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(projects.slug,'ა','a'),'ბ','b'),'გ','g'),'დ','d'),'ე','e'),'ვ','v'),'ზ','z'),'თ','t'),'ი','i'),'კ','k'),'ლ','l'),'მ','m'),'ნ','n'),'ო','o'),'პ','p'),'ჟ','zh'),'რ','r'),'ს','s'),'ტ','t'),'უ','u'),'ფ','p'),'ქ','k'),'ღ','gh'),'ყ','q'),'შ','sh'),'ჩ','ch'),'ც','ts'),'ძ','dz'),'წ','ts'),'ჭ','ch'),'ხ','kh'),'ჯ','j'),'ჰ','h'))),
    '[^a-z0-9]+', '-', 'g'
  )
where slug ~ '[^a-zA-Z0-9-]' or slug ~ ' ';
