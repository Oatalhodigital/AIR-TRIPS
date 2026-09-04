create table if not exists site_widgets (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  page text not null,
  embed_code text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Placeholders para os widgets solicitados na Fase 9.
-- O usuário deve substituir embed_code pelo código gerado no painel Travelpayouts.
insert into site_widgets (slug, name, page, embed_code)
values
  ('aviasales-popular-routes', 'Aviasales Popular Routes Widget', 'voos-comerciais', ''),
  ('hotellook-search', 'Hotellook Hotel Search Widget', 'hoteis', ''),
  ('localrent-car-search', 'Localrent Car Search Widget', 'servicos', ''),
  ('klook-popular-tours', 'Klook Popular Tours Widget', 'passeios', '')
on conflict (slug) do nothing;
