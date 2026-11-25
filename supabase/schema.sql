create table materiais (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) >= 2),
  codigo_patrimonio text not null unique check (char_length(trim(codigo_patrimonio)) between 1 and 30),
  categoria text not null check (char_length(trim(categoria)) >= 2),
  estado_conservacao text not null default 'bom' check (estado_conservacao in ('otimo', 'bom', 'regular', 'ruim')),
  situacao text not null default 'disponivel' check (situacao in ('disponivel', 'emprestado')),
  criado_em timestamptz not null default now()
);

create table solicitantes (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) >= 2),
  tipo text not null check (tipo in ('aluno', 'professor', 'funcionario')),
  contato text not null check (char_length(trim(contato)) >= 5),
  criado_em timestamptz not null default now()
);

create table emprestimos (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references materiais (id) on delete restrict,
  solicitante_id uuid not null references solicitantes (id) on delete restrict,
  emprestado_em timestamptz not null default now(),
  prazo_devolucao date not null,
  devolvido_em timestamptz,
  observacao_devolucao text
);

create unique index emprestimos_um_aberto_por_material on emprestimos (material_id) where devolvido_em is null;
create index emprestimos_material_idx on emprestimos (material_id);
create index emprestimos_solicitante_idx on emprestimos (solicitante_id);
create index emprestimos_abertos_prazo_idx on emprestimos (prazo_devolucao) where devolvido_em is null;

create function antes_de_inserir_emprestimo() returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  situacao_atual text;
begin
  select situacao into situacao_atual from materiais where id = new.material_id for update;

  if situacao_atual is distinct from 'disponivel' then
    raise exception 'Este material não está disponível para empréstimo.';
  end if;

  if new.prazo_devolucao < (now() at time zone 'America/Sao_Paulo')::date then
    raise exception 'O prazo de devolução não pode ser anterior à data atual.';
  end if;

  new.emprestado_em := now();
  new.devolvido_em := null;
  update materiais set situacao = 'emprestado' where id = new.material_id;
  return new;
end;
$$;

create trigger emprestimo_antes_de_inserir
before insert on emprestimos
for each row execute function antes_de_inserir_emprestimo();

create function antes_de_atualizar_emprestimo() returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.devolvido_em is not null then
    raise exception 'Este empréstimo já foi devolvido.';
  end if;

  new.material_id := old.material_id;
  new.solicitante_id := old.solicitante_id;
  new.emprestado_em := old.emprestado_em;

  if new.devolvido_em is not null then
    new.devolvido_em := now();
    update materiais set situacao = 'disponivel' where id = new.material_id;
  end if;

  return new;
end;
$$;

create trigger emprestimo_antes_de_atualizar
before update on emprestimos
for each row execute function antes_de_atualizar_emprestimo();

alter table materiais enable row level security;
alter table solicitantes enable row level security;
alter table emprestimos enable row level security;

create policy materiais_leitura on materiais for select to anon, authenticated using (true);
create policy materiais_insercao on materiais for insert to anon, authenticated with check (true);
create policy materiais_atualizacao on materiais for update to anon, authenticated using (true) with check (true);
create policy materiais_exclusao on materiais for delete to anon, authenticated using (true);

create policy solicitantes_leitura on solicitantes for select to anon, authenticated using (true);
create policy solicitantes_insercao on solicitantes for insert to anon, authenticated with check (true);

create policy emprestimos_leitura on emprestimos for select to anon, authenticated using (true);
create policy emprestimos_insercao on emprestimos for insert to anon, authenticated with check (true);
create policy emprestimos_atualizacao on emprestimos for update to anon, authenticated using (true) with check (true);
