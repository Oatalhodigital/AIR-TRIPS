-- Redes de afiliados
CREATE TABLE affiliate_networks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  base_url text,
  tracking_param text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Rotas nacionais (voos corporativos/comerciais)
CREATE TABLE routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_city text NOT NULL,
  origin_state text NOT NULL,
  destination_city text NOT NULL,
  destination_state text NOT NULL,
  route_type text NOT NULL CHECK (route_type IN ('corporate','leisure')),
  display_name text NOT NULL
);

-- Links/ofertas exibidos no site
CREATE TABLE affiliate_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  network_id uuid REFERENCES affiliate_networks(id),
  category text NOT NULL CHECK (category IN ('flight_domestic_corporate','flight_domestic_leisure','hotel','activity')),
  route_id uuid REFERENCES routes(id),
  title text NOT NULL,
  description text,
  image_url text,
  price_hint numeric,
  raw_url text NOT NULL,
  tracking_url text NOT NULL,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Posts de conteúdo (blog + alimentação de redes sociais)
CREATE TABLE content_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  media_url text,
  platform text CHECK (platform IN ('site_blog','instagram','tiktok','telegram')),
  status text DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published')),
  scheduled_at timestamptz,
  published_at timestamptz,
  related_link_id uuid REFERENCES affiliate_links(id)
);

-- Leads de cotação corporativa (LGPD: guardar consentimento)
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  whatsapp text,
  company text,
  message text,
  lgpd_consent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Cliques internos (analytics complementar)
CREATE TABLE link_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES affiliate_links(id),
  clicked_at timestamptz DEFAULT now(),
  utm_source text,
  utm_medium text,
  utm_campaign text
);
