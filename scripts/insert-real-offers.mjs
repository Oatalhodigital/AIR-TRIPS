// Insere as 11 ofertas reais (Klook + Aviasales) via API do Supabase
const SUPABASE_URL = "https://aqykecamgowvetrzrmnc.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeWtlY2FtZ293dmV0cnpybW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODQ1ODEwMiwiZXhwIjoyMTA0MDM0MTAyfQ.IQoXQIGXxphnuKNkrAMe6e-j3h557jcm2pz6BCgpzSo";

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function insertLink(body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/affiliate_links`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function insertRoute(body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/routes`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation,resolution=ignore-duplicates" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function getRouteId(displayName) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/routes?display_name=eq.${encodeURIComponent(displayName)}&select=id`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  );
  const data = await res.json();
  return data?.[0]?.id;
}

async function linkExists(trackingUrl) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/affiliate_links?tracking_url=eq.${encodeURIComponent(trackingUrl)}&select=id`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  );
  const data = await res.json();
  return data && data.length > 0;
}

async function main() {
  // 1. Criar rota BHZ→SAO se não existir
  console.log("=== Criando rota BHZ→SAO ===");
  const existingBhzSao = await getRouteId("Belo Horizonte → São Paulo");
  if (!existingBhzSao) {
    await insertRoute({
      origin_city: "Belo Horizonte", origin_state: "MG",
      destination_city: "São Paulo", destination_state: "SP",
      route_type: "leisure", display_name: "Belo Horizonte → São Paulo",
      origin_iata: "CNF", destination_iata: "GRU",
    });
    console.log("Rota BHZ→SAO criada.");
  } else {
    console.log("Rota BHZ→SAO já existe.");
  }

  // 2. Klook: 8 atividades
  const klookActivities = [
    { title: "City Tour Dia Completo no Rio: Cristo e Pão de Açúcar", desc: "Tour guiado de dia inteiro pelos ícones do Rio de Janeiro.", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80", url: "https://klook.tpm.li/DzkB5JJn", featured: true },
    { title: "Cristo Redentor, Catedral, Escadaria Selarón e Pão de Açúcar ao Pôr do Sol", desc: "Tour completo com os principais pontos turísticos do Rio em um único passeio.", img: "https://images.unsplash.com/photo-1577234780907-9b3b4b5c2c1e?w=800&q=80", url: "https://klook.tpm.li/gkXnIvin", featured: false },
    { title: "Trem do Corcovado e Ingresso Cristo Redentor", desc: "Ingressos para o trem do Corcovado com acesso ao Cristo Redentor.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", url: "https://klook.tpm.li/VHmVloWR", featured: false },
    { title: "Cataratas do Iguaçu: Lado Brasileiro e Argentino (Tour Privado)", desc: "Tour privado de dia inteiro pelas Cataratas do Iguaçu nos dois lados.", img: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&q=80", url: "https://klook.tpm.li/DMKQu14i", featured: true },
    { title: "Tour por Santa Teresa, Lapa e Cinelândia com Bondinho", desc: "Passeio cultural pelos bairros históricos do Rio com passeio de bondinho.", img: "https://images.unsplash.com/photo-1593992668911-57cde9c2b7d4?w=800&q=80", url: "https://klook.tpm.li/DtGc7tfc", featured: false },
    { title: "Trilha de Meio Dia no Parque Nacional da Tijuca", desc: "Trilha guiada pela floresta urbana mais extensa do mundo, partindo do Rio.", img: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80", url: "https://klook.tpm.li/LDaE9fdj", featured: false },
    { title: "Jogo de Futebol ao Vivo no Maracanã (Ingresso Direto)", desc: "Ingressos para jogos no estádio do Maracanã com entrada direta.", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80", url: "https://klook.tpm.li/NiEaXrsk", featured: false },
    { title: "City Tour de 7 Horas pelos Principais Pontos de São Paulo", desc: "Tour guiado de dia inteiro pelos destaques da cidade de São Paulo.", img: "https://images.unsplash.com/photo-1543059080-f9b1272b3b0d?w=800&q=80", url: "https://klook.tpm.li/mVkDKRna", featured: false },
  ];

  console.log("\n=== Inserindo atividades Klook ===");
  for (const a of klookActivities) {
    if (await linkExists(a.url)) { console.log(`SKIP (já existe): ${a.title}`); continue; }
    const r = await insertLink({
      category: "activity", title: a.title, description: a.desc,
      image_url: a.img, tracking_url: a.url, raw_url: a.url,
      active: true, featured: a.featured,
    });
    console.log(`${r.status === 201 ? "OK" : "ERRO"}: ${a.title} (${r.status})`);
  }

  // 3. Klook: Hotel
  console.log("\n=== Inserindo hotel Klook ===");
  const hotelUrl = "https://klook.tpm.li/bNnpLVDp";
  if (await linkExists(hotelUrl)) { console.log("SKIP (já existe): Pousada dos Coqueiros"); }
  else {
    const r = await insertLink({
      category: "hotel", title: "Pousada dos Coqueiros — Búzios",
      description: "Hospedagem em Búzios com bom custo-benefício e localização conveniente.",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      tracking_url: hotelUrl, raw_url: hotelUrl, active: true, featured: true,
    });
    console.log(`${r.status === 201 ? "OK" : "ERRO"}: Pousada dos Coqueiros (${r.status})`);
  }

  // 4. Aviasales: 3 rotas promocionais
  console.log("\n=== Inserindo ofertas Aviasales ===");
  const aviasalesOffers = [
    { routeName: "Belo Horizonte → São Paulo", title: "Belo Horizonte → São Paulo (Promocional)", desc: "Passagens promocionais Belo Horizonte → São Paulo.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", url: "https://aviasales.tpm.li/gdv8CMF9", featured: true },
    { routeName: "Belo Horizonte → Rio de Janeiro", title: "Belo Horizonte → Rio de Janeiro (Promocional)", desc: "Passagens promocionais Belo Horizonte → Rio de Janeiro.", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80", url: "https://aviasales.tpm.li/qLhcbKbt", featured: false },
    { routeName: "São Paulo → Rio de Janeiro", title: "São Paulo → Rio de Janeiro (Promocional)", desc: "Passagens promocionais São Paulo → Rio de Janeiro.", img: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80", url: "https://aviasales.tpm.li/zFXBX0wc", featured: false },
  ];

  for (const o of aviasalesOffers) {
    if (await linkExists(o.url)) { console.log(`SKIP (já existe): ${o.title}`); continue; }
    const routeId = await getRouteId(o.routeName);
    const r = await insertLink({
      category: "flight_domestic_leisure", route_id: routeId,
      title: o.title, description: o.desc, image_url: o.img,
      tracking_url: o.url, raw_url: o.url, active: true, featured: o.featured,
    });
    console.log(`${r.status === 201 ? "OK" : "ERRO"}: ${o.title} (route: ${routeId ?? "null"}) (${r.status})`);
  }

  console.log("\n=== Concluído ===");
}

main().catch(console.error);
