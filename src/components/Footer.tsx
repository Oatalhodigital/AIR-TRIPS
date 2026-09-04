import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-sm text-gray-600">
          AIR-TRIP é um comparador de viagens — direcionamos você para nossos
          parceiros, não vendemos passagens diretamente.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/sobre" className="hover:text-primary">
            Sobre
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-primary">
            Política de Privacidade
          </Link>
          <a
            href="https://www.instagram.com/air.trips_ls/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
