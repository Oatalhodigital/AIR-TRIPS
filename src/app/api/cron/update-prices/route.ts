import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

interface RouteRow {
  id: string;
  display_name: string;
  origin_iata: string | null;
  destination_iata: string | null;
}

interface LinkRow {
  id: string;
  route_id: string | null;
}

interface CheapPriceResponse {
  success: boolean;
  data: Record<
    string,
    Record<
      string,
      {
        price: number;
        airline: string;
        flight_number: number | null;
        departure_at: string;
        return_at: string;
        expires_at: string;
        number_of_changes: number;
      }
    >
  >;
  currency: string;
}

interface PricesForDatesResponse {
  success: boolean;
  data: Array<{
    origin: string;
    destination: string;
    depart_date: string;
    return_date: string | null;
    price: number;
    airline: string;
    flight_number: number | null;
    expires_at: string;
    number_of_changes: number;
    link: string;
  }>;
  currency: string;
}

const MARKER = "772285";
const API_BASE = "https://api.travelpayouts.com";

function monthString(offset = 0): string {
  const d = new Date();
  d.setMonth(d.getMonth() + offset);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

async function fetchWithRetry(
  url: string,
  token: string,
  attempts = 2
): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { "X-Access-Token": token },
        cache: "no-store",
      });
      if (res.status === 429 && i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }
  throw lastErr ?? new Error("fetch failed");
}

async function fetchPriceForRoute(
  origin: string,
  destination: string,
  token: string
): Promise<{ price: number; link: string } | null> {
  // 1) Tenta prices_for_dates (traz link de afiliado pronto).
  const thisMonth = monthString(0);
  const nextMonth = monthString(1);
  for (const departDate of [thisMonth, nextMonth]) {
    const url =
      `${API_BASE}/aviasales/v3/prices_for_dates` +
      `?origin=${origin}&destination=${destination}` +
      `&departure_at=${departDate}&currency=brl&sorting=price&limit=1&token=${token}`;
    try {
      const res = await fetchWithRetry(url, token);
      if (!res.ok) continue;
      const json = (await res.json()) as PricesForDatesResponse;
      if (json.success && json.data && json.data.length > 0) {
        const item = json.data[0];
        const link = item.link
          ? `https://www.aviasales.com${item.link}${
              item.link.includes("?") ? "&" : "?"
            }marker=${MARKER}`
          : "";
        return { price: item.price, link };
      }
    } catch {
      // continua para proxima tentativa
    }
  }

  // 2) Fallback: prices/cheap (traz o menor preco do mes, sem link).
  for (const departDate of [thisMonth, nextMonth]) {
    const url =
      `${API_BASE}/v1/prices/cheap` +
      `?origin=${origin}&destination=${destination}` +
      `&depart_date=${departDate}&currency=brl&token=${token}`;
    try {
      const res = await fetchWithRetry(url, token);
      if (!res.ok) continue;
      const json = (await res.json()) as CheapPriceResponse;
      if (json.success && json.data) {
        const destData = json.data[destination];
        if (destData) {
          const first = Object.values(destData)[0];
          if (first && typeof first.price === "number") {
            return { price: first.price, link: "" };
          }
        }
      }
    } catch {
      // continua
    }
  }

  return null;
}

export async function GET(request: Request) {
  // Protecao: header x-cron-secret deve bater com CRON_SECRET.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return Response.json(
      { error: "CRON_SECRET nao configurado no servidor." },
      { status: 500 }
    );
  }
  const provided = request.headers.get("x-cron-secret");
  if (provided !== cronSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) {
    return Response.json(
      { error: "TRAVELPAYOUTS_API_TOKEN nao configurado." },
      { status: 500 }
    );
  }

  const supabase = createAdminClient();

  // Busca todas as rotas ativas com IATA preenchido.
  const { data: routes, error: rErr } = await supabase
    .from("routes")
    .select("id, display_name, origin_iata, destination_iata")
    .not("origin_iata", "is", null)
    .not("destination_iata", "is", null);

  if (rErr || !routes) {
    return Response.json(
      { error: "Erro ao buscar rotas", detail: rErr?.message },
      { status: 500 }
    );
  }

  const results: Array<{
    route: string;
    origin: string;
    destination: string;
    price: number | null;
    link: string | null;
    status: string;
  }> = [];

  for (const route of routes as RouteRow[]) {
    const origin = route.origin_iata!;
    const destination = route.destination_iata!;
    try {
      const result = await fetchPriceForRoute(origin, destination, token);
      if (!result) {
        results.push({
          route: route.display_name,
          origin,
          destination,
          price: null,
          link: null,
          status: "no_data",
        });
        continue;
      }

      // Atualiza TODAS as ofertas vinculadas a essa rota.
      const { data: links } = await supabase
        .from("affiliate_links")
        .select("id")
        .eq("route_id", route.id);

      if (links && links.length > 0) {
        const update: {
          price_hint: number;
          price_hint_updated_at: string;
          tracking_url?: string;
        } = {
          price_hint: result.price,
          price_hint_updated_at: new Date().toISOString(),
        };
        if (result.link) {
          update.tracking_url = result.link;
        }
        for (const link of links as LinkRow[]) {
          await supabase
            .from("affiliate_links")
            .update(update)
            .eq("id", link.id);
        }
      }

      results.push({
        route: route.display_name,
        origin,
        destination,
        price: result.price,
        link: result.link || null,
        status: "updated",
      });
    } catch (e) {
      results.push({
        route: route.display_name,
        origin,
        destination,
        price: null,
        link: null,
        status: `error: ${String(e)}`,
      });
    }
  }

  return Response.json({
    ok: true,
    updated_at: new Date().toISOString(),
    routes_processed: routes.length,
    results,
  });
}
