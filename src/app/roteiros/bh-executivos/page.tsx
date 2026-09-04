export const metadata = {
  title: "Belo Horizonte e região para executivos — AIR-TRIP",
  description: "Roteiro curto e objetivo para quem viaja a negócios em Belo Horizonte: gastronomia, eventos e passeios rápidos.",
};

export default function BhExecutivosPost() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">
        Belo Horizonte e região para executivos
      </h1>
      <p className="mb-8 text-sm text-gray-500">Publicado em 01/09/2026</p>

      <div className="prose prose-gray max-w-none">
        <p>
          Belo Horizonte é um dos principais centros de negócios do Brasil. Se
          você tem poucos dias entre reuniões, dá para conhecer a cidade sem
          abrir mão da agenda profissional.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dia útil: reuniões e gastronomia
        </h2>
        <p>
          Os principais polos empresariais ficam na Savassi, Lourdes e região da
          <strong>Avenida do Contorno</strong>. Para almoço de negócios, o
          Mercado Central e os restaurantes da <strong>Savassi</strong> oferecem
          opções rápidas e de qualidade. Não deixe de provar o tradicional
          pão de queijo de BH — sobra de tempo para duas reuniões depois.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Final de semana ou tarde livre: Ouro Preto e Inhotim
        </h2>
        <p>
          Se sobrar uma tarde, <strong>Ouro Preto</strong> está a cerca de 100 km
          e vale o bate-e-volta. Já <strong>Inhotim</strong>, em Brumadinho, é
          uma das maiores galerias de arte a céu aberto do mundo e fica a pouco
          mais de uma hora do centro de BH. Para quem busca relax entre
          compromissos, é uma pausa inspiradora.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Dicas para executivos
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>
            Prefira hotéis na região da Savassi ou Lourdes para reduzir o tempo
            de deslocamento.
          </li>
          <li>
            Reserve transfer do aeroporto com antecedência — o trânsito na
            Confins pode ser imprevisível.
          </li>
          <li>
            Se precisar estender a viagem, considere uma noite em Ouro Preto.
          </li>
        </ul>
      </div>
    </article>
  );
}
