-- ძველი ჩანაწერების slug-ები, რომლებიც ქართული ასოებით შეიქმნა (URL-ში მუშაობის პრობლემას იწვევს),
-- ახლა გადაითარგმნება ლათინურად — იმავე წესით, რასაც admin ფორმა იყენებს ახალი ჩანაწერებისთვის.
update team_members
set slug =
  regexp_replace(
    trim(both '-' from lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(name,'ა','a'),'ბ','b'),'გ','g'),'დ','d'),'ე','e'),'ვ','v'),'ზ','z'),'თ','t'),'ი','i'),'კ','k'),'ლ','l'),'მ','m'),'ნ','n'),'ო','o'),'პ','p'),'ჟ','zh'),'რ','r'),'ს','s'),'ტ','t'),'უ','u'),'ფ','p'),'ქ','k'),'ღ','gh'),'ყ','q'),'შ','sh'),'ჩ','ch'),'ც','ts'),'ძ','dz'),'წ','ts'),'ჭ','ch'),'ხ','kh'),'ჯ','j'),'ჰ','h'))),
    '[^a-z0-9]+', '-', 'g'
  ) || '-' || id
where slug ~ '[^a-z0-9-]';
