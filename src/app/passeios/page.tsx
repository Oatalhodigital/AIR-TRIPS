import { OfferCard } from "@/components/OfferCard";
import { GetYourGuideWidget } from "@/components/GetYourGuideWidget";
import { getOffers } from "@/lib/data";

export const revalidate = 300;

export const metadata = {
  title: "Passeios e Atrações — AIR-TRIP",
  description: "Tours, passeios e atrações selecionadas.",
};

export default async function PasseiosPage() {
  const offers = await getOffers();
  const activities = offers.filter((o) => o.category === "activity");
  const widget = activities.find((o) => o.embed_code)?.embed_code;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Passeios e Atrações
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Atividades imperdíveis para complementar sua viagem.
      </p>

      {widget && (
        <div className="mb-10">
          <GetYourGuideWidget code={widget} />
        </div>
      )}

      {activities.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
          Nenhum passeio ou atividade cadastrada ainda.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
}
