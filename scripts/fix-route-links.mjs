// Corrige route_id nas ofertas Aviasales que ficaram sem rota
const SUPABASE_URL = "https://aqykecamgowvetrzrmnc.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeWtlY2FtZ293dmV0cnpybW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODQ1ODEwMiwiZXhwIjoyMTA0MDM0MTAyfQ.IQoXQIGXxphnuKNkrAMe6e-j3h557jcm2pz6BCgpzSo";
const headers = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function main() {
  // Listar todas as rotas
  const routesRes = await fetch(`${SUPABASE_URL}/rest/v1/routes?select=id,display_name`, { headers });
  const routes = await routesRes.json();
  console.log("Rotas no banco:", routes.map(r => r.display_name));

  // Listar ofertas Aviasales sem route_id
  const linksRes = await fetch(
    `${SUPABASE_URL}/rest/v1/affiliate_links?tracking_url=like.*aviasales*&select=id,title,tracking_url,route_id`,
    { headers }
  );
  const links = await linksRes.json();
  console.log("\nOfertas Aviasales:", links);

  // Para cada oferta sem route_id, tentar match por título
  for (const link of links.filter(l => !l.route_id)) {
    let routeName = null;
    if (link.title.includes("Belo Horizonte") && link.title.includes("São Paulo")) routeName = "Belo Horizonte → São Paulo";
    else if (link.title.includes("Belo Horizonte") && link.title.includes("Rio")) routeName = "Belo Horizonte → Rio de Janeiro";
    else if (link.title.includes("São Paulo") && link.title.includes("Rio")) routeName = "São Paulo → Rio de Janeiro";

    if (routeName) {
      const route = routes.find(r =>
        r.display_name.includes(routeName.split(" → ")[0]) &&
        r.display_name.includes(routeName.split(" → ")[1])
      );
      if (route) {
        const updateRes = await fetch(
          `${SUPABASE_URL}/rest/v1/affiliate_links?id=eq.${link.id}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ route_id: route.id }) }
        );
        console.log(`Update ${link.title} → route ${route.display_name}: ${updateRes.status}`);
      } else {
        console.log(`Route not found: ${routeName}`);
      }
    }
  }
}

main().catch(console.error);
