-- Banco de dados do convite do chá de bebê da Alice
-- Execute este arquivo no SQL Editor do projeto Supabase.
-- NUNCA coloque service_role neste projeto ou no GitHub.

create extension if not exists pgcrypto;

create table if not exists public.confirmacoes_alice (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  confirmou boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.presentes_alice (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  presente text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mensagens_alice (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  mensagem text not null,
  created_at timestamptz not null default now()
);

alter table public.confirmacoes_alice enable row level security;
alter table public.presentes_alice enable row level security;
alter table public.mensagens_alice enable row level security;

-- Convidados: podem somente inserir seus próprios registros.
drop policy if exists "anon pode inserir confirmacoes" on public.confirmacoes_alice;
create policy "anon pode inserir confirmacoes"
on public.confirmacoes_alice for insert to anon
with check (length(trim(nome)) between 1 and 120);

drop policy if exists "anon pode inserir presentes" on public.presentes_alice;
create policy "anon pode inserir presentes"
on public.presentes_alice for insert to anon
with check (length(trim(nome)) between 1 and 120 and length(trim(presente)) between 1 and 200);

drop policy if exists "anon pode inserir mensagens" on public.mensagens_alice;
create policy "anon pode inserir mensagens"
on public.mensagens_alice for insert to anon
with check (length(trim(nome)) between 1 and 120 and length(trim(mensagem)) between 1 and 1000);

-- Administrador autenticado: pode visualizar os dados.
drop policy if exists "admin autenticado pode ler confirmacoes" on public.confirmacoes_alice;
create policy "admin autenticado pode ler confirmacoes"
on public.confirmacoes_alice for select to authenticated
using (true);

drop policy if exists "admin autenticado pode ler presentes" on public.presentes_alice;
create policy "admin autenticado pode ler presentes"
on public.presentes_alice for select to authenticated
using (true);

drop policy if exists "admin autenticado pode ler mensagens" on public.mensagens_alice;
create policy "admin autenticado pode ler mensagens"
on public.mensagens_alice for select to authenticated
using (true);

-- O painel não precisa apagar ou editar registros.
revoke update, delete on public.confirmacoes_alice from anon, authenticated;
revoke update, delete on public.presentes_alice from anon, authenticated;
revoke update, delete on public.mensagens_alice from anon, authenticated;
