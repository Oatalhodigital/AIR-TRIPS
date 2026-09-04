-- Fase 13: suporte a preços reais via API da Travelpayouts.
-- Execute no Supabase Studio -> SQL Editor.

-- Adiciona colunas de IATA em routes (para chamada da API).
alter table routes
  add column if not exists origin_iata text,
  add column if not exists destination_iata text;

-- Adiciona timestamp de atualizacao do preco em affiliate_links.
alter table affiliate_links
  add column if not exists price_hint_updated_at timestamptz;

-- Atualiza as rotas existentes com os codigos IATA conhecidos.
update routes set origin_iata = 'CNF', destination_iata = 'SDU'
  where display_name ilike '%Belo Horizonte%Rio%' or (origin_city ilike '%Belo Horizonte%' and destination_city ilike '%Rio%');

update routes set origin_iata = 'CGH', destination_iata = 'SDU'
  where display_name ilike '%São Paulo%Rio%' or (origin_city ilike '%São Paulo%' and destination_city ilike '%Rio%');

update routes set origin_iata = 'SSA', destination_iata = 'GRU'
  where display_name ilike '%Salvador%São Paulo%' or (origin_city ilike '%Salvador%' and destination_city ilike '%São Paulo%');
