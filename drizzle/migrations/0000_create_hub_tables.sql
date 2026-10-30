create table public.hub_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  model text,
  created_at timestamptz not null default now()
);
create index hub_messages_user_created_idx on public.hub_messages (user_id, created_at);

create table public.hub_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  due_date date,
  account_email text,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
create index hub_reminders_user_created_idx on public.hub_reminders (user_id, created_at);

create table public.linked_google_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  slot int not null check (slot between 1 and 3),
  email text,
  status text not null default 'disconnected' check (status in ('connected','disconnected','pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slot)
);

grant select, insert, update, delete on public.hub_messages to authenticated;
grant all on public.hub_messages to service_role;
alter table public.hub_messages enable row level security;
create policy "Users read own hub messages" on public.hub_messages for select to authenticated using (user_id = auth.uid());
create policy "Users insert own hub messages" on public.hub_messages for insert to authenticated with check (user_id = auth.uid());
create policy "Users delete own hub messages" on public.hub_messages for delete to authenticated using (user_id = auth.uid());

grant select, insert, update, delete on public.hub_reminders to authenticated;
grant all on public.hub_reminders to service_role;
alter table public.hub_reminders enable row level security;
create policy "Users read own reminders" on public.hub_reminders for select to authenticated using (user_id = auth.uid());
create policy "Users insert own reminders" on public.hub_reminders for insert to authenticated with check (user_id = auth.uid());
create policy "Users update own reminders" on public.hub_reminders for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users delete own reminders" on public.hub_reminders for delete to authenticated using (user_id = auth.uid());

grant select, insert, update, delete on public.linked_google_accounts to authenticated;
grant all on public.linked_google_accounts to service_role;
alter table public.linked_google_accounts enable row level security;
create policy "Users read own linked accounts" on public.linked_google_accounts for select to authenticated using (user_id = auth.uid());
create policy "Users insert own linked accounts" on public.linked_google_accounts for insert to authenticated with check (user_id = auth.uid());
create policy "Users update own linked accounts" on public.linked_google_accounts for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users delete own linked accounts" on public.linked_google_accounts for delete to authenticated using (user_id = auth.uid());