create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null check (category in (
    'flights','hotels','car_rental','airport_transfer','esim',
    'travel_insurance','flight_compensation','tours_activities',
    'luggage_storage','bike_rental','city_pass'
  )),
  logo_url text,
  description text,
  tracking_url text,
  embed_code text,
  commission_info text,
  cookie_info text,
  featured boolean default false,
  active boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);
