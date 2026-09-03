import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.production.local");

function unquote(v) {
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([^#\s=]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = unquote(m[2]);
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const networks = [
  { name: "Travelpayouts", base_url: "https://www.travelpayouts.com", tracking_param: "marker", notes: "Voos e hoteis" },
  { name: "GetYourGuide", base_url: "https://www.getyourguide.com", tracking_param: "partner_id", notes: "Passeios e atividades" },
];

const routes = [
  { origin_city: "Belo Horizonte", origin_state: "MG", destination_city: "Rio de Janeiro", destination_state: "RJ", route_type: "corporate", display_name: "Belo Horizonte (CNF) → Rio de Janeiro (SDU)" },
  { origin_city: "São Paulo", origin_state: "SP", destination_city: "Rio de Janeiro", destination_state: "RJ", route_type: "corporate", display_name: "São Paulo (CGH) → Rio de Janeiro (SDU)" },
  { origin_city: "Salvador", origin_state: "BA", destination_city: "São Paulo", destination_state: "SP", route_type: "corporate", display_name: "Salvador (SSA) → São Paulo (GRU/CGH)" },
];

async function seed() {
  const { data: existingNetworks } = await supabase.from("affiliate_networks").select("id, name");
  const netMap = {};
  for (const n of existingNetworks || []) netMap[n.name] = n.id;

  for (const n of networks) {
    if (!netMap[n.name]) {
      const { data, error } = await supabase.from("affiliate_networks").insert(n).select("id, name").single();
      if (error) throw error;
      netMap[data.name] = data.id;
    }
  }

  const { data: existingRoutes } = await supabase.from("routes").select("id, display_name");
  const routeMap = {};
  for (const r of existingRoutes || []) routeMap[r.display_name] = r.id;

  for (const r of routes) {
    if (!routeMap[r.display_name]) {
      const { data, error } = await supabase.from("routes").insert(r).select("id, display_name").single();
      if (error) throw error;
      routeMap[data.display_name] = data.id;
    }
  }

  const offers = [
    { network: "Travelpayouts", category: "flight_domestic_corporate", route: "Belo Horizonte (CNF) → Rio de Janeiro (SDU)", title: "Belo Horizonte → Rio de Janeiro", description: "Rotas diárias para executivos. A partir de", image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", price_hint: 349, tracking_url: "SUBSTITUIR_PELO_LINK_REAL", active: true, featured: true },
    { network: "Travelpayouts", category: "flight_domestic_corporate", route: "São Paulo (CGH) → Rio de Janeiro (SDU)", title: "São Paulo → Rio de Janeiro", description: "Pontes aéreas para executivos.", image_url: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80", price_hint: 279, tracking_url: "SUBSTITUIR_PELO_LINK_REAL", active: true, featured: true },
    { network: "Travelpayouts", category: "flight_domestic_corporate", route: "Salvador (SSA) → São Paulo (GRU/CGH)", title: "Salvador → São Paulo", description: "Conexão para viagens de negócios.", image_url: "https://images.unsplash.com/photo-1529074969284-224f24349819?w=800&q=80", price_hint: 459, tracking_url: "SUBSTITUIR_PELO_LINK_REAL", active: true, featured: false },
    { network: "GetYourGuide", category: "activity", route: null, title: "Passeio pelo Rio com Guia", description: "Cristo, Pão de Açúcar e praias.", image_url: "https://images.unsplash.com/photo-1593995863951-57cdd92f2734?w=800&q=80", price_hint: 199, tracking_url: "SUBSTITUIR_PELO_LINK_REAL", active: true, featured: false },
  ];

  const { data: existingOffers } = await supabase.from("affiliate_links").select("title");
  const existingTitles = new Set((existingOffers || []).map((o) => o.title));

  for (const o of offers) {
    if (existingTitles.has(o.title)) continue;
    const row = {
      network_id: netMap[o.network],
      category: o.category,
      route_id: o.route ? routeMap[o.route] : null,
      title: o.title,
      description: o.description,
      image_url: o.image_url,
      price_hint: o.price_hint,
      raw_url: o.tracking_url,
      tracking_url: o.tracking_url,
      active: o.active,
      featured: o.featured,
    };
    const { error } = await supabase.from("affiliate_links").insert(row);
    if (error) throw error;
  }

  console.log("Seed applied.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
