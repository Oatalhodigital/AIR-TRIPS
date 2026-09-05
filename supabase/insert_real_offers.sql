-- Insere ofertas reais com links de afiliado da Klook e Aviasales.
-- Execute no Supabase Studio → SQL Editor.
-- Imagens: Unsplash temáticas (Klook bloqueia scraping de OG image).

-- ============================================================
-- KLOOK: Passeios e Atividades (7 atividades únicas)
-- ============================================================

insert into affiliate_links (category, title, description, image_url, tracking_url, raw_url, active, featured)
values
(
  'activity',
  'City Tour Dia Completo no Rio: Cristo e Pão de Açúcar',
  'Tour guiado de dia inteiro pelos ícones do Rio de Janeiro.',
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
  'https://klook.tpm.li/DzkB5JJn',
  'https://www.klook.com/pt-BR/activity/119435-city-tour-full-day-in-rio-christ-the-redeemer-and-sugar-loaf/',
  true, true
),
(
  'activity',
  'Cristo Redentor, Catedral, Escadaria Selarón e Pão de Açúcar ao Pôr do Sol',
  'Tour completo com os principais pontos turísticos do Rio em um único passeio.',
  'https://images.unsplash.com/photo-1577234780907-9b3b4b5c2c1e?w=800&q=80',
  'https://klook.tpm.li/gkXnIvin',
  'https://www.klook.com/pt-BR/activity/145356-christ-the-redeemer-cathedral-selaron-step-sugarloaf-sunset-tour/',
  true, false
),
(
  'activity',
  'Trem do Corcovado e Ingresso Cristo Redentor',
  'Ingressos para o trem do Corcovado com acesso ao Cristo Redentor.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'https://klook.tpm.li/VHmVloWR',
  'https://www.klook.com/pt-BR/activity/221566-corcovado-train-and-christ-the-redeemer-ticket-in-rio-de-janeiro/',
  true, false
),
(
  'activity',
  'Cataratas do Iguaçu: Lado Brasileiro e Argentino (Tour Privado)',
  'Tour privado de dia inteiro pelas Cataratas do Iguaçu nos dois lados.',
  'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&q=80',
  'https://klook.tpm.li/DMKQu14i',
  'https://www.klook.com/pt-BR/activity/146713-iguazu-falls-brazil-and-argentina-sides-private-day-tour/',
  true, true
),
(
  'activity',
  'Tour por Santa Teresa, Lapa e Cinelândia com Bondinho',
  'Passeio cultural pelos bairros históricos do Rio com passeio de bondinho.',
  'https://images.unsplash.com/photo-1593992668911-57cde9c2b7d4?w=800&q=80',
  'https://klook.tpm.li/DtGc7tfc',
  'https://www.klook.com/pt-BR/activity/111701-santa-teresa-lapa-and-cinelandia-tour-with-tram-ride/',
  true, false
),
(
  'activity',
  'Trilha de Meio Dia no Parque Nacional da Tijuca',
  'Trilha guiada pela floresta urbana mais extensa do mundo, partindo do Rio.',
  'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80',
  'https://klook.tpm.li/LDaE9fdj',
  'https://www.klook.com/pt-BR/activity/194634-tijuca-national-park-half-day-hiking-tour-from-rio/',
  true, false
),
(
  'activity',
  'Jogo de Futebol ao Vivo no Maracanã (Ingresso Direto)',
  'Ingressos para jogos no estádio do Maracanã com entrada direta.',
  'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
  'https://klook.tpm.li/NiEaXrsk',
  'https://www.klook.com/pt-BR/activity/85828-live-football-match-direct-entry-admission-maracana-stadium/',
  true, false
),
(
  'activity',
  'City Tour de 7 Horas pelos Principais Pontos de São Paulo',
  'Tour guiado de dia inteiro pelos destaques da cidade de São Paulo.',
  'https://images.unsplash.com/photo-1543059080-f9b1272b3b0d?w=800&q=80',
  'https://klook.tpm.li/mVkDKRna',
  'https://www.klook.com/pt-BR/activity/83897-7-hour-sao-paulo-main-city-sights-full-day-tour-guided-tour/',
  true, false
);

-- ============================================================
-- KLOOK: Hotel (1 único — Pousada dos Coqueiros em Búzios)
-- ============================================================

insert into affiliate_links (category, title, description, image_url, tracking_url, raw_url, active, featured)
values
(
  'hotel',
  'Pousada dos Coqueiros — Búzios',
  'Hospedagem em Búzios com bom custo-benefício e localização conveniente.',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://klook.tpm.li/bNnpLVDp',
  'https://www.klook.com/pt-BR/hotels/detail/31656-pousada-dos-coqueiros-buzios/',
  true, true
);

-- ============================================================
-- AVIASALES: Ofertas de voo promocional (3 rotas)
-- Usa os links "cheapest tickets" de cada rota.
-- ============================================================

-- Rota BHZ→SAO (Belo Horizonte → São Paulo) — nova rota
insert into routes (origin_city, origin_state, destination_city, destination_state, route_type, display_name, origin_iata, destination_iata)
values ('Belo Horizonte', 'MG', 'São Paulo', 'SP', 'leisure', 'Belo Horizonte → São Paulo', 'CNF', 'GRU')
on conflict do nothing;

insert into affiliate_links (category, route_id, title, description, image_url, tracking_url, raw_url, active, featured)
select 'flight_domestic_leisure', r.id, 'Belo Horizonte → São Paulo',
  'Passagens promocionais Belo Horizonte → São Paulo.',
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  'https://aviasales.tpm.li/gdv8CMF9',
  'https://www.aviasales.com/?marker=772285&params=BHZSAO1',
  true, true
from routes r
where r.display_name = 'Belo Horizonte → São Paulo'
and not exists (
  select 1 from affiliate_links al where al.tracking_url = 'https://aviasales.tpm.li/gdv8CMF9'
);

-- Rota BHZ→RIO (Belo Horizonte → Rio) — rota existente
insert into affiliate_links (category, route_id, title, description, image_url, tracking_url, raw_url, active, featured)
select 'flight_domestic_leisure', r.id, 'Belo Horizonte → Rio de Janeiro (Promocional)',
  'Passagens promocionais Belo Horizonte → Rio de Janeiro.',
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
  'https://aviasales.tpm.li/qLhcbKbt',
  'https://www.aviasales.com/?marker=772285&params=BHZRIO1',
  true, false
from routes r
where r.display_name = 'Belo Horizonte → Rio de Janeiro'
and not exists (
  select 1 from affiliate_links al where al.tracking_url = 'https://aviasales.tpm.li/qLhcbKbt'
);

-- Rota SAO→RIO (São Paulo → Rio) — rota existente
insert into affiliate_links (category, route_id, title, description, image_url, tracking_url, raw_url, active, featured)
select 'flight_domestic_leisure', r.id, 'São Paulo → Rio de Janeiro (Promocional)',
  'Passagens promocionais São Paulo → Rio de Janeiro.',
  'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
  'https://aviasales.tpm.li/zFXBX0wc',
  'https://www.aviasales.com/?marker=772285&params=SAORIO1',
  true, false
from routes r
where r.display_name = 'São Paulo → Rio de Janeiro'
and not exists (
  select 1 from affiliate_links al where al.tracking_url = 'https://aviasales.tpm.li/zFXBX0wc'
);
