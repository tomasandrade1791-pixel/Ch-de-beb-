-- CORREÇÃO DAS PERMISSÕES DO EVENTO E DAS CONFIRMAÇÕES
-- Não apaga nem altera nenhum dado existente.

-- EVENTO
alter table public.evento_alice enable row level security;

drop policy if exists "Public can read evento_alice" on public.evento_alice;
drop policy if exists "Admin can manage evento_alice" on public.evento_alice;

create policy "Public can read evento_alice"
on public.evento_alice
for select
to anon, authenticated
using (true);

create policy "Admin can manage evento_alice"
on public.evento_alice
for all
to authenticated
using (
  (select auth.jwt() ->> 'email') = 'tomasandrade1791@gmail.com'
)
with check (
  (select auth.jwt() ->> 'email') = 'tomasandrade1791@gmail.com'
);

revoke all on table public.evento_alice from anon, authenticated;
grant select on table public.evento_alice to anon, authenticated;
grant insert, update, delete on table public.evento_alice to authenticated;

-- CONFIRMAÇÕES
-- O convite é público, então o visitante precisa poder registrar
-- sua própria resposta sem precisar fazer login.
alter table public.confirmacoes_alice enable row level security;

drop policy if exists "Public can insert confirmacoes_alice" on public.confirmacoes_alice;

create policy "Public can insert confirmacoes_alice"
on public.confirmacoes_alice
for insert
to anon, authenticated
with check (true);

grant insert on table public.confirmacoes_alice to anon, authenticated;
