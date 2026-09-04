-- Substitui temporariamente os links placeholder nas ofertas de exemplo
-- pelo link genérico do Aviasales enquanto o usuário não gera deep links por rota.
-- Execute no Supabase Studio → SQL Editor.

-- 1) Corrige os links placeholder.
update affiliate_links
set
  tracking_url = 'https://aviasales.tpm.li/uMbp7EUz',
  raw_url = 'https://aviasales.tpm.li/uMbp7EUz'
where tracking_url in ('SUBSTITUIR_PELO_LINK_REAL', 'LINK_REAL_AQUI')
   or raw_url in ('SUBSTITUIR_PELO_LINK_REAL', 'LINK_REAL_AQUI');

-- 2) Vincula as ofertas de exemplo às rotas corretas (para o cron atualizar precos automaticamente).
update affiliate_links al
set route_id = r.id
from routes r
where al.title ilike '%Belo Horizonte%Rio%'
  and r.display_name ilike '%Belo Horizonte%Rio%'
  and al.route_id is null;

update affiliate_links al
set route_id = r.id
from routes r
where al.title ilike '%São Paulo%Rio%'
  and r.display_name ilike '%São Paulo%Rio%'
  and al.route_id is null;

update affiliate_links al
set route_id = r.id
from routes r
where al.title ilike '%Salvador%São Paulo%'
  and r.display_name ilike '%Salvador%São Paulo%'
  and al.route_id is null;
