-- Substitui temporariamente o link placeholder nas ofertas de exemplo
-- pelo link genérico do Aviasales enquanto o usuário não gera deep links por rota.
-- Execute no Supabase Studio → SQL Editor.

update affiliate_links
set
  tracking_url = 'https://aviasales.tpm.li/uMbp7EUz',
  raw_url = 'https://aviasales.tpm.li/uMbp7EUz'
where tracking_url = 'SUBSTITUIR_PELO_LINK_REAL'
   or raw_url = 'SUBSTITUIR_PELO_LINK_REAL';
