import Link from "next/link";

export const metadata = {
  title: "Roteiros — AIR-TRIP",
  description: "Roteiros de viagem, dicas e conteúdo para inspirar sua próxima viagem.",
};

const posts = [
  {
    slug: "rio-em-3-dias",
    title: "O que fazer no Rio de Janeiro em 3 dias",
    excerpt:
      "Cristo Redentor, Pão de Açúcar, praias do Sul e gastronomia local — roteiro completo.",
    date: "03/09/2026",
  },
  {
    slug: "bh-executivos",
    title: "Belo Horizonte e região para executivos",
    excerpt:
      "Roteiro curto e objetivo para quem viaja a negócios: gastronomia, eventos e passeios rápidos.",
    date: "01/09/2026",
  },
];

export default function RoteirosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-foreground">Roteiros</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Conteúdo, dicas e roteiros para você aproveitar cada destino.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/roteiros/${post.slug}`}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-xs font-medium text-gray-400">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {post.title}
            </h2>
            <p className="mt-2 text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
