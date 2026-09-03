# AIR-TRIP

Site de divulgação de passagens aéreas, hotéis e passeios via links de afiliado. O AIR-TRIP é uma vitrine comparativa: não vende diretamente, apenas direciona para os sites dos parceiros.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Supabase (Postgres) — `supabase/schema.sql`
- Google Analytics 4 + Meta Pixel

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie `env.example.txt` para `.env.local` e preencha:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000`.

## Configurar o Supabase

1. Faça login no Supabase CLI:
   ```bash
   npx supabase login
   ```

2. Aplique o schema:
   ```bash
   npx supabase sql --project-ref <ref> -f supabase/schema.sql
   ```

   Ou cole o conteúdo de `supabase/schema.sql` no SQL Editor do Supabase.

## Como cadastrar uma nova oferta

1. Gere o link de afiliado no painel do parceiro:
   - **Travelpayouts**: use o formulário de *deep link* do painel ou widgets.
   - **GetYourGuide**: use o *Affiliate Link Builder* no Partner Portal para gerar um link `gyg.me/...`.

2. No Supabase, abra a tabela `affiliate_links` e insira um registro com:
   - `category`: `flight_domestic_corporate`, `flight_domestic_leisure`, `hotel` ou `activity`.
   - `title`: nome curto da oferta.
   - `tracking_url`: o link de afiliado gerado no painel.
   - `price_hint`: preço inicial, opcional.
   - `image_url`: URL da imagem.
   - `active`: `true`.

3. Se for voo, relacione com uma `route` previamente cadastrada na tabela `routes`.

4. Marque `featured = true` para exibir na home.

## Estrutura de pastas

- `src/app/*` — páginas (App Router).
- `src/components/*` — componentes reutilizáveis.
- `src/lib/*` — dados mock, cliente Supabase e utilitários.
- `supabase/schema.sql` — banco de dados.

## Deploy

O deploy foi pensado para a Vercel. Basta conectar o repositório e adicionar as variáveis de ambiente.
