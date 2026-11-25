-- Dados de demonstração. Pode ser executado mais de uma vez sem duplicar registros.

insert into materiais (nome, codigo_patrimonio, categoria, estado_conservacao)
values
  ('Projetor Epson X41', 'PAT-0001', 'Projetor', 'bom'),
  ('Notebook Dell Latitude', 'PAT-0002', 'Notebook', 'otimo'),
  ('Cabo HDMI 2 m', 'PAT-0003', 'Cabo', 'regular')
on conflict (codigo_patrimonio) do nothing;

insert into solicitantes (nome, tipo, contato)
select 'Juliana', 'professor', 'juliana@exemplo.com.br'
where not exists (
  select 1 from solicitantes
  where nome = 'Juliana' and tipo = 'professor' and contato = 'juliana@exemplo.com.br'
);

insert into solicitantes (nome, tipo, contato)
select 'Rafael', 'aluno', '(47) 99999-0001'
where not exists (
  select 1 from solicitantes
  where nome = 'Rafael' and tipo = 'aluno' and contato = '(47) 99999-0001'
);
