export type Category =
  | 'flight_domestic_corporate'
  | 'flight_domestic_leisure'
  | 'hotel'
  | 'activity'

export interface Offer {
  id: string
  category: Category
  title: string
  description?: string
  image_url: string
  price_hint?: number
  tracking_url: string
  featured?: boolean
  origin?: string
  destination?: string
}

export const offers: Offer[] = [
  {
    id: '1',
    category: 'flight_domestic_corporate',
    title: 'Belo Horizonte → Rio de Janeiro',
    description: 'Rotas diárias para executivos. A partir de',
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    price_hint: 349,
    tracking_url: '#',
    featured: true,
    origin: 'BH',
    destination: 'RIO',
  },
  {
    id: '2',
    category: 'flight_domestic_corporate',
    title: 'São Paulo → Rio de Janeiro',
    description: 'Pontes aéreas com flexibilidade de horário.',
    image_url: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
    price_hint: 279,
    tracking_url: '#',
    featured: true,
    origin: 'SP',
    destination: 'RIO',
  },
  {
    id: '3',
    category: 'flight_domestic_corporate',
    title: 'Bahia → São Paulo',
    description: 'Conexão para viagens de negócios.',
    image_url: 'https://images.unsplash.com/photo-1529074969284-224f24349819?w=800&q=80',
    price_hint: 459,
    tracking_url: '#',
    featured: false,
    origin: 'BA',
    destination: 'SP',
  },
  {
    id: '4',
    category: 'flight_domestic_leisure',
    title: 'Rio de Janeiro → Salvador',
    description: 'Escapada de lazer com melhores tarifas.',
    image_url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
    price_hint: 499,
    tracking_url: '#',
    featured: true,
    origin: 'RIO',
    destination: 'BA',
  },
  {
    id: '5',
    category: 'hotel',
    title: 'Hotéis em Copacabana',
    description: 'Hospedagem próxima à praia e aeroporto.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    price_hint: 220,
    tracking_url: '#',
    featured: false,
  },
  {
    id: '6',
    category: 'activity',
    title: 'Passeio pelo Rio com Guia',
    description: 'Cristo, Pão de Açúcar e praias.',
    image_url: 'https://images.unsplash.com/photo-1593995863951-57cdd92f2734?w=800&q=80',
    price_hint: 199,
    tracking_url: '#',
    featured: false,
  },
]

export const categoryLabels: Record<Category, string> = {
  flight_domestic_corporate: 'Voo Corporativo',
  flight_domestic_leisure: 'Voo Promocional',
  hotel: 'Hotel',
  activity: 'Passeio',
}

import { supabase } from './supabase'

export async function getOffers(): Promise<Offer[]> {
  if (!supabase) return offers
  const { data, error } = await supabase
    .from('affiliate_links')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error || !data) return offers
  return data as Offer[]
}

export async function getRoutes(): Promise<Offer[]> {
  if (!supabase) return offers.filter((o) => o.origin && o.destination)
  const { data, error } = await supabase.from('routes').select('*')
  if (error || !data) return offers.filter((o) => o.origin && o.destination)
  return data as unknown as Offer[]
}
