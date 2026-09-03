export const metadata = {
  title: "Sobre — AIR-TRIP",
  description: "O AIR-TRIP é um divulgador e comparador de ofertas de viagem.",
};

export default function SobrePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Sobre o AIR-TRIP</h1>
      <div className="space-y-4 text-gray-600">
        <p>
          O AIR-TRIP é um site de divulgação de passagens aéreas, hotéis e passeios.
          Não vendemos nem emitimos bilhetes: somos uma vitrine comparativa que direciona
          você para a compra direto nos sites dos parceiros.
        </p>
        <p>
          Trabalhamos com programas de afiliados como Travelpayouts e GetYourGuide.
          Quando você clica em uma oferta e finaliza a compra no parceiro, podemos
          receber uma comissão — isso não aumenta o preço para você.
        </p>
        <p>
          Nosso foco inicial são as rotas domésticas corporativas e comerciais do
          Brasil, mas também vamos trazer roteiros de viagem, dicas e conteúdo.
        </p>
      </div>
    </section>
  );
}
