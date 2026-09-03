import Link from 'next/link'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/voos-corporativos', label: 'Corporativo' },
  { href: '/voos-comerciais', label: 'Promoções' },
  { href: '/hoteis', label: 'Hotéis' },
  { href: '/passeios', label: 'Passeios' },
  { href: '/roteiros', label: 'Roteiros' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          AIR-TRIP
        </Link>
        <nav className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
