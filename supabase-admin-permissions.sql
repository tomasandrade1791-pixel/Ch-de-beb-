-- CORREÇÃO DAS PERMISSÕES DO EVENTO, CONFIRMAÇÕES E LISTA DE PRESENTES
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

-- LISTA DE PRESENTES
-- Os convidados precisam conseguir consultar os limites definidos
-- pelos papais e os itens disponíveis sem fazer login.
alter table public.limites_presentes_alice enable row level security;

drop policy if exists "Public can read limites_presentes_alice" on public.limites_presentes_alice;

create policy "Public can read limites_presentes_alice"
on public.limites_presentes_alice
for select
to anon, authenticated
using (true);

grant select on table public.limites_presentes_alice to anon, authenticated;

-- Registros dos presentes escolhidos também precisam ser consultáveis
-- para que a página consiga mostrar quantas pessoas já escolheram cada item.
alter table public.presentes_alice enable row level security;

drop policy if exists "Public can read presentes_alice" on public.presentes_alice;

create policy "Public can read presentes_alice"
on public.presentes_alice
for select
to anon, authenticated
using (true);

grant select on table public.presentes_alice to anon, authenticated;

-- O convidado também poderá registrar a escolha do presente.
drop policy if exists "Public can insert presentes_alice" on public.presentes_alice;

create policy "Public can insert presentes_alice"
on public.presentes_alice
for insert
to anon, authenticated
with check (true);

grant insert on table public.presentes_alice to anon, authenticated;

notify pgrst, 'reload schema';
