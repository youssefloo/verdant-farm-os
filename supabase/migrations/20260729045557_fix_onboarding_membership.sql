-- Keep farm creation and owner membership atomic. The trigger function lives in
-- the non-exposed private schema and cannot be invoked by API roles.
create or replace function private.add_farm_owner_membership()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null or new.owner_id <> (select auth.uid()) then
    raise exception 'Farm owner must match the authenticated user'
      using errcode = '42501';
  end if;

  insert into public.farm_members (farm_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (farm_id, user_id)
  do update set role = 'owner';

  return new;
end;
$$;

revoke all on function private.add_farm_owner_membership() from public;
revoke all on function private.add_farm_owner_membership() from anon;
revoke all on function private.add_farm_owner_membership() from authenticated;

drop trigger if exists farms_add_owner_membership on public.farms;
create trigger farms_add_owner_membership
after insert on public.farms
for each row execute function private.add_farm_owner_membership();

-- Repair any farm created by an earlier partially completed onboarding request.
insert into public.farm_members (farm_id, user_id, role)
select f.id, f.owner_id, 'owner'
from public.farms f
where not exists (
  select 1
  from public.farm_members fm
  where fm.farm_id = f.id and fm.user_id = f.owner_id
)
on conflict (farm_id, user_id)
do update set role = 'owner';
