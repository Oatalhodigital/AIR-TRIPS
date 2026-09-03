-- Redes de afiliados
INSERT INTO affiliate_networks (name, base_url, tracking_param, notes) VALUES
  ('Travelpayouts', 'https://www.travelpayouts.com', 'marker', 'Voos e hoteis'),
  ('GetYourGuide', 'https://www.getyourguide.com', 'partner_id', 'Passeios e atividades');

-- Rotas de exemplo
INSERT INTO routes (origin_city, origin_state, destination_city, destination_state, route_type, display_name) VALUES
  ('Belo Horizonte', 'MG', 'Rio de Janeiro', 'RJ', 'corporate', 'Belo Horizonte (CNF) → Rio de Janeiro (SDU)'),
  ('São Paulo', 'SP', 'Rio de Janeiro', 'RJ', 'corporate', 'São Paulo (CGH) → Rio de Janeiro (SDU)'),
  ('Salvador', 'BA', 'São Paulo', 'SP', 'corporate', 'Salvador (SSA) → São Paulo (GRU/CGH)');

-- Ofertas placeholders
INSERT INTO affiliate_links (network_id, category, route_id, title, description, image_url, price_hint, raw_url, tracking_url, active, featured) VALUES
  ((SELECT id FROM affiliate_networks WHERE name = 'Travelpayouts'), 'flight_domestic_corporate', (SELECT id FROM routes WHERE display_name = 'Belo Horizonte (CNF) → Rio de Janeiro (SDU)'), 'Belo Horizonte → Rio de Janeiro', 'Rotas diárias para executivos. A partir de', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 349, 'SUBSTITUIR_PELO_LINK_REAL', 'SUBSTITUIR_PELO_LINK_REAL', true, true),
  ((SELECT id FROM affiliate_networks WHERE name = 'Travelpayouts'), 'flight_domestic_corporate', (SELECT id FROM routes WHERE display_name = 'São Paulo (CGH) → Rio de Janeiro (SDU)'), 'São Paulo → Rio de Janeiro', 'Pontes aéreas para executivos.', 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80', 279, 'SUBSTITUIR_PELO_LINK_REAL', 'SUBSTITUIR_PELO_LINK_REAL', true, true),
  ((SELECT id FROM affiliate_networks WHERE name = 'Travelpayouts'), 'flight_domestic_corporate', (SELECT id FROM routes WHERE display_name = 'Salvador (SSA) → São Paulo (GRU/CGH)'), 'Salvador → São Paulo', 'Conexão para viagens de negócios.', 'https://images.unsplash.com/photo-1529074969284-224f24349819?w=800&q=80', 459, 'SUBSTITUIR_PELO_LINK_REAL', 'SUBSTITUIR_PELO_LINK_REAL', true, false),
  ((SELECT id FROM affiliate_networks WHERE name = 'GetYourGuide'), 'activity', NULL, 'Passeio pelo Rio com Guia', 'Cristo, Pão de Açúcar e praias.', 'https://images.unsplash.com/photo-1593995863951-57cdd92f2734?w=800&q=80', 199, 'SUBSTITUIR_PELO_LINK_REAL', 'SUBSTITUIR_PELO_LINK_REAL', true, false);
