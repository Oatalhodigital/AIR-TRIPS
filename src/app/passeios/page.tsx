import { OfferCard } from "@/components/OfferCard";
import { offers } from "@/lib/data";

export const metadata = {
  title: "Passeios e Atrações — AIR-TRIP",
  description: "Tours, passeios e atrações selecionadas.",
};

export default function PasseiosPage() {
  const activities = offers.filter((o) => o.category === "activity");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Passeios e Atrações
      </h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Atividades imperdíveis para complementar sua viagem.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
