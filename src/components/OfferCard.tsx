import { categoryLabels, Offer } from '@/lib/data'

export function OfferCard({ offer }: { offer: Offer }) {
  const label = categoryLabels[offer.category]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={offer.image_url}
          alt={offer.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-primary shadow-sm">
          {label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-tight text-foreground">
          {offer.title}
        </h3>
        {offer.description && (
          <p className="mt-1 text-sm text-gray-500">{offer.description}</p>
        )}
        <div className="mt-auto pt-4">
          {offer.price_hint ? (
            <p className="text-sm text-gray-500">
              a partir de{' '}
              <span className="text-lg font-bold text-foreground">
                R$ {offer.price_hint}
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">Consulte a melhor tarifa</p>
          )}
          <a
            href={offer.tracking_url}
            target="_blank"
            rel="nofollow sponsored"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Ver oferta
          </a>
        </div>
      </div>
    </article>
  )
}
