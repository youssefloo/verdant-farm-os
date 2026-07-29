create extension if not exists pgcrypto;
create schema if not exists private;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  locale text not null default 'en' check (locale in ('en','ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.farms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  operation_type text not null,
  acreage_band text,
  team_size integer not null default 1 check (team_size > 0),
  country text not null default 'Canada',
  region text,
  onboarding_complete boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.farm_members (
  farm_id uuid not null references public.farms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'worker' check (role in ('owner','manager','worker','advisor','viewer')),
  created_at timestamptz not null default now(),
  primary key (farm_id,user_id)
);

create or replace function private.is_farm_member(target_farm_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.farm_members fm
    where fm.farm_id = target_farm_id and fm.user_id = (select auth.uid())
  ) or exists (
    select 1 from public.farms f
    where f.id = target_farm_id and f.owner_id = (select auth.uid())
  );
$$;
revoke all on function private.is_farm_member(uuid) from public;
grant usage on schema private to authenticated;
grant execute on function private.is_farm_member(uuid) to authenticated;

create table public.animals (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  tag_id text not null,
  display_name text not null,
  species text not null default 'cattle',
  breed text,
  herd_group text,
  sex text check (sex in ('female','male','unknown')),
  birth_date date,
  weight_kg numeric(8,2),
  health_score integer check (health_score between 0 and 100),
  status text not null default 'healthy',
  daily_feed_kg numeric(8,2),
  daily_output_l numeric(8,2),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique(farm_id,tag_id)
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  job_title text not null,
  employment_type text not null default 'full_time',
  email text,
  phone text,
  hourly_rate numeric(10,2),
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'scheduled' check (status in ('scheduled','in_progress','blocked','completed','cancelled')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  assigned_employee_id uuid references public.employees(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resource_readings (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  resource_type text not null check (resource_type in ('water','electricity','feed','fuel','waste','other')),
  zone text not null,
  value numeric(14,3) not null,
  unit text not null,
  recorded_at timestamptz not null default now(),
  recorded_by uuid not null default auth.uid() references auth.users(id),
  notes text
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  transaction_date date not null default current_date,
  counterparty text not null,
  description text,
  category text not null,
  amount numeric(14,2) not null,
  direction text not null check (direction in ('income','expense')),
  status text not null default 'posted',
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.automations (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  name text not null,
  trigger_type text not null,
  trigger_config jsonb not null default '{}'::jsonb,
  actions jsonb not null default '[]'::jsonb,
  enabled boolean not null default true,
  last_run_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_logs (
  id bigint generated always as identity primary key,
  farm_id uuid not null references public.farms(id) on delete cascade,
  actor_id uuid not null default auth.uid() references auth.users(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  title text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index animals_farm_idx on public.animals(farm_id) where archived_at is null;
create index employees_farm_idx on public.employees(farm_id) where archived_at is null;
create index tasks_farm_due_idx on public.tasks(farm_id,due_at);
create index readings_farm_recorded_idx on public.resource_readings(farm_id,recorded_at desc);
create index transactions_farm_date_idx on public.transactions(farm_id,transaction_date desc);
create index logs_farm_created_idx on public.activity_logs(farm_id,created_at desc);

alter table public.profiles enable row level security;
alter table public.farms enable row level security;
alter table public.farm_members enable row level security;
alter table public.animals enable row level security;
alter table public.employees enable row level security;
alter table public.tasks enable row level security;
alter table public.resource_readings enable row level security;
alter table public.transactions enable row level security;
alter table public.automations enable row level security;
alter table public.activity_logs enable row level security;

create policy profiles_select on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_insert on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy farms_select on public.farms for select to authenticated using (private.is_farm_member(id));
create policy farms_insert on public.farms for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy farms_update on public.farms for update to authenticated using (private.is_farm_member(id)) with check (private.is_farm_member(id));

create policy members_select on public.farm_members for select to authenticated using (private.is_farm_member(farm_id));
create policy members_insert on public.farm_members for insert to authenticated with check (private.is_farm_member(farm_id) and user_id = (select auth.uid()));
create policy members_update on public.farm_members for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy members_delete on public.farm_members for delete to authenticated using (private.is_farm_member(farm_id));

create policy animals_all_select on public.animals for select to authenticated using (private.is_farm_member(farm_id));
create policy animals_insert on public.animals for insert to authenticated with check (private.is_farm_member(farm_id));
create policy animals_update on public.animals for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy animals_delete on public.animals for delete to authenticated using (private.is_farm_member(farm_id));

create policy employees_select on public.employees for select to authenticated using (private.is_farm_member(farm_id));
create policy employees_insert on public.employees for insert to authenticated with check (private.is_farm_member(farm_id));
create policy employees_update on public.employees for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy employees_delete on public.employees for delete to authenticated using (private.is_farm_member(farm_id));

create policy tasks_select on public.tasks for select to authenticated using (private.is_farm_member(farm_id));
create policy tasks_insert on public.tasks for insert to authenticated with check (private.is_farm_member(farm_id));
create policy tasks_update on public.tasks for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy tasks_delete on public.tasks for delete to authenticated using (private.is_farm_member(farm_id));

create policy readings_select on public.resource_readings for select to authenticated using (private.is_farm_member(farm_id));
create policy readings_insert on public.resource_readings for insert to authenticated with check (private.is_farm_member(farm_id));
create policy readings_update on public.resource_readings for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy readings_delete on public.resource_readings for delete to authenticated using (private.is_farm_member(farm_id));

create policy transactions_select on public.transactions for select to authenticated using (private.is_farm_member(farm_id));
create policy transactions_insert on public.transactions for insert to authenticated with check (private.is_farm_member(farm_id));
create policy transactions_update on public.transactions for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy transactions_delete on public.transactions for delete to authenticated using (private.is_farm_member(farm_id));

create policy automations_select on public.automations for select to authenticated using (private.is_farm_member(farm_id));
create policy automations_insert on public.automations for insert to authenticated with check (private.is_farm_member(farm_id));
create policy automations_update on public.automations for update to authenticated using (private.is_farm_member(farm_id)) with check (private.is_farm_member(farm_id));
create policy automations_delete on public.automations for delete to authenticated using (private.is_farm_member(farm_id));

create policy logs_select on public.activity_logs for select to authenticated using (private.is_farm_member(farm_id));
create policy logs_insert on public.activity_logs for insert to authenticated with check (private.is_farm_member(farm_id) and actor_id = (select auth.uid()));

grant select,insert,update on public.profiles to authenticated;
grant select,insert,update on public.farms to authenticated;
grant select,insert,update,delete on public.farm_members,public.animals,public.employees,public.tasks,public.resource_readings,public.transactions,public.automations to authenticated;
grant select,insert on public.activity_logs to authenticated;
grant usage,select on sequence public.activity_logs_id_seq to authenticated;
