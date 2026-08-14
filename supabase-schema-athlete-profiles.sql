-- სპორტსმენების სრული პროფილები (ფოტო, ბიო, მიღწევები)
alter table team_members add column if not exists slug text;
alter table team_members add column if not exists photo_url text;
alter table team_members add column if not exists birth_year integer;
alter table team_members add column if not exists club text;
alter table team_members add column if not exists bio text;
alter table team_members add column if not exists achievements text;

-- უკვე არსებული ჩანაწერებისთვის slug სახელიდან (რომ URL-ები არ დაირღვეს)
update team_members set slug = lower(regexp_replace(name, '\s+', '-', 'g')) || '-' || id
where slug is null;

alter table team_members add constraint team_members_slug_key unique (slug);
