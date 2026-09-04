export const metadata = {
  title: "O que fazer no Rio de Janeiro em 3 dias — AIR-TRIP",
  description: "Roteiro completo de 3 dias no Rio de Janeiro: Cristo Redentor, Pão de Açúcar, praias e gastronomia local.",
};

export default function Rio3DiasPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        O que fazer no Rio de Janeiro em 3 dias
      </h1>
      <p className="mb-8 text-sm text-gray-500">Publicado em 03/09/2026</p>

      <div className="prose prose-gray max-w-none">
        <p>
          O Rio de Janeiro é um dos destinos mais completos do Brasil: montanhas,
          praias, gastronomia e cultura em um só lugar. Se você tem três dias
          para aproveitar a cidade, este roteiro equilibra os clássicos com
          experiências mais locais.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dia 1: ícones da cidade
        </h2>
        <p>
          Comece cedo pelo <strong>Cristo Redentor</strong>. O acesso de trem do
          Corcovado é a maneira mais tradicional e vale cada minuto. Reserve
          ingressos com antecedência, principalmente em alta temporada. Depois,
          desça para o bairro de Santa Teresa: almoce em uma das cantinas do
          bairro e caminhe pelas ruas de paralelepípedos.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dia 2: praias e Pão de Açúcar
        </h2>
        <p>
          Aproveite a manhã na <strong>Praia de Copacabana</strong> ou
          <strong>Ipanema</strong>. À tarde, vá ao <strong>Pão de Açúcar</strong>: o
          bondinho oferece uma das vistas mais bonitas do mundo. Para o pôr do
          sol, a pedra do Arpoador é parada obrigatória — e fica entre as duas
          praias.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dia 3: cultura e gastronomia
        </h2>
        <p>
          Reserve o terceiro dia para o <strong>Museu do Amanhã</strong>, na
          região portuária, e para o <strong>MER</strong> (Museu de Arte do Rio).
          Para almoço, explore a gastronomia de bares e restaurantes do Centro e
          da Lapa. Termine com uma noite de samba ou um passeio noturno pela
          orla.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dicas práticas
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>Use transporte por aplicativo ou metrô para fugir do trânsito.</li>
          <li>
            Reserve passeios e ingressos online para não perder tempo em fila.
          </li>
          <li>
            Leve protetor solar, água e calçado confortável — a cidade exige
            caminhada.
          </li>
        </ul>
      </div>
    </article>
  );
}
