import {
  getPartners,
  getCategoryLabel,
  groupPartnersByCategory,
  PartnerCategory,
} from "@/lib/partners";
import { Partner } from "@/lib/partners";
import { TrackedLink } from "@/components/TrackedLink";
import { SiteWidget } from "@/components/SiteWidget";
import Image from "next/image";

export const metadata = {
  title: "Parceiros e Serviços — AIR-TRIP",
  description: "Catálogo de parceiros de voos, aluguel de carro, eSIM, seguros, passeios e muito mais.",
};

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <TrackedLink
      href={partner.tracking_url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      partner={partner.name}
      category={partner.category}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex h-12 items-center">
        {partner.logo_url ? (
          <Image
            src={partner.logo_url}
            alt={partner.name}
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto object-contain"
          />
        ) : (
          <span className="text-lg font-bold text-primary">{partner.name}</span>
        )}
      </div>
      {partner.description && (
        <p className="mb-4 flex-1 text-sm text-gray-600">{partner.description}</p>
      )}
      <div className="mt-auto space-y-1 text-xs text-gray-500">
        {partner.commission_info && (
          <p>Comissão: {partner.commission_info}</p>
        )}
        {partner.cookie_info && (
          <p>Cookie: {partner.cookie_info}</p>
        )}
      </div>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
        Acessar oferta
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </TrackedLink>
  );
}

export default async function ServicosPage() {
  const partners = await getPartners();
  const grouped = groupPartnersByCategory(partners);
  const categories = Object.keys(grouped) as PartnerCategory[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Parceiros e Serviços
      </h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Confira as melhores opções de parceiros para cada etapa da sua viagem.
        Todos os links são de afiliados e direcionam para os sites dos parceiros.
      </p>

      {partners.length === 0 ? (
        <p className="text-gray-600">
          Nenhum parceiro cadastrado ainda. Cadastre na tabela <code>partners</code> do Supabase.
        </p>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                {getCategoryLabel(category)}
              </h2>
              {category === "car_rental" && (
                <SiteWidget
                  slug="localrent-car-search"
                  title="Buscar carros"
                  fallback={
                    <p className="text-sm text-gray-600">
                      O formulário de busca de aluguel de carros aparecerá aqui
                      quando o código Localrent for cadastrado.
                    </p>
                  }
                />
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {grouped[category].map((p) => (
                  <PartnerCard key={p.id} partner={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
