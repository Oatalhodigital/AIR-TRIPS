import { supabasePublic } from './supabase-public';

export type PartnerCategory =
  | 'flights'
  | 'hotels'
  | 'car_rental'
  | 'airport_transfer'
  | 'esim'
  | 'travel_insurance'
  | 'flight_compensation'
  | 'tours_activities'
  | 'luggage_storage'
  | 'bike_rental'
  | 'city_pass';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  category: PartnerCategory;
  logo_url: string | null;
  description: string | null;
  tracking_url: string | null;
  embed_code: string | null;
  commission_info: string | null;
  cookie_info: string | null;
  featured: boolean;
  active: boolean;
  display_order: number;
  created_at: string;
}

const categoryLabels: Record<PartnerCategory, string> = {
  flights: 'Voos',
  hotels: 'Hotéis',
  car_rental: 'Aluguel de Carro',
  airport_transfer: 'Transfers',
  esim: 'eSIM / Conectividade',
  travel_insurance: 'Seguro e Proteção de Viagem',
  flight_compensation: 'Compensação de Voo',
  tours_activities: 'Passeios e Ingressos',
  luggage_storage: 'Guarda-volumes',
  bike_rental: 'Aluguel de Bicicleta',
  city_pass: 'City Pass',
};

export function getCategoryLabel(category: PartnerCategory) {
  return categoryLabels[category] || category;
}

export async function getPartners(): Promise<Partner[]> {
  if (!supabasePublic) return [];
  const { data, error } = await supabasePublic
    .from('partners')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });
  if (error || !data) return [];
  return data as unknown as Partner[];
}

export function groupPartnersByCategory(partners: Partner[]) {
  const groups: Record<string, Partner[]> = {};
  for (const p of partners) {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  }
  return groups;
}
