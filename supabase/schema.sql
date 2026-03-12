-- Schleppy Dashboard Schema

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'queued' check (status in ('queued', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  message text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'active',
  repo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  summary text
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  direction text not null check (direction in ('inbound', 'outbound')),
  content text not null,
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_activity_log_created_at on activity_log(created_at desc);
create index if not exists idx_messages_created_at on messages(created_at desc);
create index if not exists idx_sessions_started_at on sessions(started_at desc);

-- Updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to relevant tables
create or replace trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

create or replace trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();
