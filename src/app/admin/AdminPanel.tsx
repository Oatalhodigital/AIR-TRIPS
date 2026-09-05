"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createLink,
  createPartner,
  createRoute,
  listLinks,
  listNetworks,
  listPartners,
  listRoutes,
  listSiteWidgets,
  signOut,
  toggleLink,
  togglePartner,
  updateSiteWidget,
} from "./actions";

interface Route {
  id: string;
  display_name: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  route_type: string;
}

interface Network {
  id: string;
  name: string;
}

interface LinkItem {
  id: string;
  title: string;
  category: string;
  tracking_url: string;
  active: boolean;
  featured: boolean;
  price_hint: number | null;
  price_hint_updated_at: string | null;
  routes?: { display_name?: string }[] | null;
}

interface PartnerItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  tracking_url: string;
  active: boolean;
}

interface SiteWidgetItem {
  id: string;
  slug: string;
  name: string;
  page: string;
  embed_code: string | null;
}

const categoryOptions = [
  { value: "flights", label: "Voos" },
  { value: "hotels", label: "Hotéis" },
  { value: "car_rental", label: "Aluguel de Carro" },
  { value: "airport_transfer", label: "Transfer / Traslado" },
  { value: "esim", label: "eSIM / Conectividade" },
  { value: "travel_insurance", label: "Seguro Viagem" },
  { value: "flight_compensation", label: "Compensação de Voo" },
  { value: "tours_activities", label: "Passeios e Atividades" },
  { value: "luggage_storage", label: "Guarda-volumes" },
  { value: "bike_rental", label: "Aluguel de Bicicleta" },
  { value: "city_pass", label: "City Pass" },
];

export default function AdminPanel() {
  const [routeState, routeAction] = useActionState(createRoute, null);
  const [linkState, linkAction] = useActionState(createLink, null);
  const [partnerState, partnerAction] = useActionState(createPartner, null);
  const [widgetState, widgetAction] = useActionState(updateSiteWidget, null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [widgets, setWidgets] = useState<SiteWidgetItem[]>([]);
  const router = useRouter();

  const refresh = () => {
    let active = true;
    Promise.all([
      listRoutes(),
      listNetworks(),
      listLinks(),
      listPartners(),
      listSiteWidgets(),
    ]).then(([r, n, l, p, w]) => {
      if (active) {
        setRoutes(r.data ?? []);
        setNetworks(n.data ?? []);
        setLinks(l.data ?? []);
        setPartners(p.data ?? []);
        setWidgets(w.data ?? []);
      }
    });
    return () => {
      active = false;
    };
  };

  useEffect(refresh, []);

  useEffect(() => {
    if (routeState?.ok || linkState?.ok || partnerState?.ok || widgetState?.ok) {
      refresh();
    }
  }, [routeState, linkState, partnerState, widgetState]);

  async function handleToggle(
    id: string,
    field: "active" | "featured",
    current: boolean
  ) {
    await toggleLink(id, field, !current);
    refresh();
  }

  async function handlePartnerToggle(id: string, current: boolean) {
    await togglePartner(id, !current);
    refresh();
  }

  async function handleLogout() {
    await signOut();
    router.push("/admin/login");
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="mb-6 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
      >
        Sair
      </button>

      <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>Curadoria manual vs. automático:</strong> rotas em destaque na
        Home e cards de oferta são curadoria manual — revise semanalmente. Os
        widgets de busca e “populares” nas páginas de categoria são automáticos
        e não precisam de manutenção constante. Preços de voos são atualizados
        automaticamente 1x por dia via API da Travelpayouts.
      </div>

      {/* === SEÇÃO PRINCIPAL: Nova oferta + Ofertas cadastradas === */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Nova oferta</h2>
        <form action={linkAction} className="space-y-3">
          <input
            name="title"
            placeholder="Título"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <select
            name="category"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="flight_domestic_corporate">Voo Corporativo</option>
            <option value="flight_domestic_leisure">Voo Promocional</option>
            <option value="hotel">Hotel</option>
            <option value="activity">Passeio</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select
              name="route_id"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">Sem rota</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.display_name}
                </option>
              ))}
            </select>
            <select
              name="network_id"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">Sem rede</option>
              {networks.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>
          <input
            name="tracking_url"
            placeholder="Link de afiliado (tracking_url)"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            name="raw_url"
            placeholder="URL original do parceiro (opcional)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            name="image_url"
            placeholder="URL da imagem (opcional)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            name="price_hint"
            type="number"
            placeholder="Preço a partir de (opcional — vazio = automático)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            rows={2}
            placeholder="Descrição (opcional)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <textarea
            name="embed_code"
            rows={2}
            placeholder="Código de embed / widget (opcional)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" name="featured" className="rounded" />
            Destacar na home
          </label>
          {linkState?.error && (
            <p className="text-sm text-red-600">{linkState.error}</p>
          )}
          {linkState?.ok && (
            <p className="text-sm text-green-600">Oferta salva.</p>
          )}
          <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
            Salvar oferta
          </button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Ofertas cadastradas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2">Título</th>
                <th className="pb-2">Categoria</th>
                <th className="pb-2">Rota</th>
                <th className="pb-2">Preço</th>
                <th className="pb-2">Atualizado</th>
                <th className="pb-2">Ativo</th>
                <th className="pb-2">Destaque</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{link.title}</td>
                  <td className="py-3 pr-4 text-gray-500">{link.category}</td>
                  <td className="py-3 pr-4 text-gray-500">
                    {link.routes?.[0]?.display_name ?? "—"}
                  </td>
                  <td className="py-3 pr-4 text-gray-700">
                    {link.price_hint ? `R$ ${link.price_hint}` : "—"}
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-500">
                    {link.price_hint_updated_at
                      ? new Date(link.price_hint_updated_at).toLocaleString(
                          "pt-BR"
                        )
                      : "manual"}
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() =>
                        handleToggle(link.id, "active", link.active)
                      }
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        link.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {link.active ? "Sim" : "Não"}
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() =>
                        handleToggle(link.id, "featured", link.featured)
                      }
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        link.featured
                          ? "bg-blue-100 text-primary"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {link.featured ? "Sim" : "Não"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === SEÇÃO RECOLHÍVEL: Rotas === */}
      <details className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <summary className="cursor-pointer rounded-2xl p-6 text-lg font-semibold hover:bg-gray-50">
          Rotas (usado raramente)
        </summary>
        <div className="p-6 pt-0">
          <form action={routeAction} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                name="origin_city"
                placeholder="Cidade origem"
                required
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                name="origin_state"
                placeholder="UF"
                required
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="destination_city"
                placeholder="Cidade destino"
                required
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                name="destination_state"
                placeholder="UF"
                required
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <select
              name="route_type"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="corporate">corporate</option>
              <option value="leisure">leisure</option>
            </select>
            <input
              name="display_name"
              placeholder="Nome de exibição (ex.: Belo Horizonte → Rio)"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            {routeState?.error && (
              <p className="text-sm text-red-600">{routeState.error}</p>
            )}
            {routeState?.ok && (
              <p className="text-sm text-green-600">Rota salva.</p>
            )}
            <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
              Salvar rota
            </button>
          </form>
        </div>
      </details>

      {/* === SEÇÃO RECOLHÍVEL: Parceiros === */}
      <details className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <summary className="cursor-pointer rounded-2xl p-6 text-lg font-semibold hover:bg-gray-50">
          Parceiros ({partners.length} cadastrados)
        </summary>
        <div className="p-6 pt-0">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-base font-semibold">Novo parceiro</h3>
              <form action={partnerAction} className="space-y-3">
                <input
                  name="name"
                  placeholder="Nome do parceiro"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <input
                  name="slug"
                  placeholder="Slug (ex.: aviasales)"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <select
                  name="category"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  name="tracking_url"
                  placeholder="Link de afiliado tpm.li"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <input
                  name="logo_url"
                  placeholder="URL do logo"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <textarea
                  name="description"
                  placeholder="Descrição"
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="commission_info"
                    placeholder="Comissão"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    name="cookie_info"
                    placeholder="Cookie"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <input
                  name="display_order"
                  type="number"
                  placeholder="Ordem"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" name="featured" className="rounded" />
                  Destacar
                </label>
                {partnerState?.error && (
                  <p className="text-sm text-red-600">{partnerState.error}</p>
                )}
                {partnerState?.ok && (
                  <p className="text-sm text-green-600">Parceiro salvo.</p>
                )}
                <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary-hover">
                  Salvar parceiro
                </button>
              </form>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">
                Parceiros cadastrados
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-2">Nome</th>
                      <th className="pb-2">Categoria</th>
                      <th className="pb-2">Ativo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{p.name}</td>
                        <td className="py-3 pr-4 text-gray-500">{p.category}</td>
                        <td className="py-3">
                          <button
                            onClick={() =>
                              handlePartnerToggle(p.id, p.active)
                            }
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              p.active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {p.active ? "Sim" : "Não"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </details>

      {/* === SEÇÃO RECOLHÍVEL: Widgets === */}
      <details className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <summary className="cursor-pointer rounded-2xl p-6 text-lg font-semibold hover:bg-gray-50">
          Widgets do site ({widgets.length})
        </summary>
        <div className="p-6 pt-0">
          <p className="mb-4 text-sm text-gray-600">
            Cole abaixo o código de embed gerado no painel da Travelpayouts
            para cada widget. Deixe em branco para usar o fallback textual.
          </p>
          <div className="space-y-4">
            {widgets.map((w) => (
              <form
                key={w.id}
                action={widgetAction}
                className="space-y-2 border-b border-gray-100 pb-4 last:border-0"
              >
                <input type="hidden" name="id" value={w.id} />
                <div className="flex items-center justify-between">
                  <p className="font-medium">{w.name}</p>
                  <span className="text-xs text-gray-500">slug: {w.slug}</span>
                </div>
                <textarea
                  name="embed_code"
                  defaultValue={w.embed_code || ""}
                  rows={3}
                  placeholder="Código de embed (Travelpayouts)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono"
                />
                {widgetState?.error && (
                  <p className="text-sm text-red-600">{widgetState.error}</p>
                )}
                {widgetState?.ok && (
                  <p className="text-sm text-green-600">Widget atualizado.</p>
                )}
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">
                  Salvar widget
                </button>
              </form>
            ))}
          </div>
        </div>
      </details>
    </>
  );
}
