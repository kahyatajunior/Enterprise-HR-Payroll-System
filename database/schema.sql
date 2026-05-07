create table departments (
  id bigserial primary key,
  name text not null unique,
  cost_center text not null,
  created_at timestamptz not null default now()
);

create table employees (
  id text primary key,
  department_id bigint not null references departments(id),
  manager_id text references employees(id),
  first_name text not null,
  last_name text not null,
  role text not null,
  employment_status text not null check (employment_status in ('active', 'probation', 'terminated', 'on_leave')),
  hire_date date not null,
  base_salary numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payroll_runs (
  id bigserial primary key,
  period_start date not null,
  period_end date not null,
  status text not null check (status in ('draft', 'review', 'approved', 'paid')),
  created_by text not null references employees(id),
  approved_by text references employees(id),
  created_at timestamptz not null default now()
);

create table payslips (
  id bigserial primary key,
  payroll_run_id bigint not null references payroll_runs(id),
  employee_id text not null references employees(id),
  gross_salary numeric(12, 2) not null,
  tax_deduction numeric(12, 2) not null,
  benefits_deduction numeric(12, 2) not null,
  loan_deduction numeric(12, 2) not null default 0,
  net_salary numeric(12, 2) not null,
  generated_at timestamptz not null default now()
);

create table leave_requests (
  id bigserial primary key,
  employee_id text not null references employees(id),
  leave_type text not null,
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('pending', 'approved', 'declined')),
  approver_id text references employees(id),
  created_at timestamptz not null default now()
);

create table attendance_entries (
  id bigserial primary key,
  employee_id text not null references employees(id),
  work_date date not null,
  check_in timestamptz,
  check_out timestamptz,
  status text not null check (status in ('present', 'late', 'absent', 'remote')),
  unique (employee_id, work_date)
);

create table audit_logs (
  id bigserial primary key,
  actor_id text references employees(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
