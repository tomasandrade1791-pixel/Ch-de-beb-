-- CORREÇÃO DAS PERMISSÕES DO EVENTO
-- Não apaga nem altera nenhum dado existente.

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
