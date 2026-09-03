import { OfferCard } from "@/components/OfferCard";
import { offers } from "@/lib/data";

export const metadata = {
  title: "Hotéis — AIR-TRIP",
  description: "Hospedagens selecionadas em destinos nacionais.",
};

export default function HoteisPage() {
  const hotels = offers.filter((o) => o.category === "hotel");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">Hotéis</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Opções de hospedagem próximas a aeroportos e pontos turísticos.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
