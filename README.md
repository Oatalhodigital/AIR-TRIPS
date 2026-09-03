# AIR-TRIP

Site de divulgação de passagens aéreas, hotéis e passeios via links de afiliado. O AIR-TRIP é uma vitrine comparativa: não vende diretamente, apenas direciona para os sites dos parceiros.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Supabase (Postgres + Auth) — `supabase/schema.sql`
- Google Analytics 4 + Meta Pixel

## Variáveis de ambiente

Copie `env.example` para `.env.local` e preencha com os valores reais. **Nenhum valor real deve ser commitado**.

| Nome | Onde conseguir | Público? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL do site na Vercel (ex.: `https://air-trips.vercel.app`) | sim |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → URL | sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon public` | sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` (secreta) | **não** |
| `NEXT_PUBLIC_GA_ID` | Google Analytics → Admin → Fluxo de dados → ID da medição | sim |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager → Configurações do Pixel → ID do pixel | sim |

## Como rodar local

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Preencha o `.env.local` com os valores reais.

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

2. Aplique o schema e o seed:
   ```bash
   npx supabase sql --project-ref <ref> -f supabase/schema.sql
   npx supabase sql --project-ref <ref> -f supabase/seed.sql
   ```

   Ou cole o conteúdo de `supabase/schema.sql` e `supabase/seed.sql` no SQL Editor do Supabase.

3. Ative **Supabase Auth** (e-mail/senha) e crie o usuário administrador em **Authentication → Users → Add user**.

## Como acessar o /admin

1. Acesse `http://localhost:3000/admin` (ou `/admin` no domínio de produção).
2. Faça login com o e-mail/senha cadastrado no Supabase Studio.
3. Use o formulário para cadastrar rotas e ofertas.

## Como cadastrar uma nova oferta

1. Gere o link de afiliado real no painel do parceiro:
   - **Travelpayouts**: use o formulário de *deep link* ou *widget* do painel.
   - **GetYourGuide**: use o *Affiliate Link Builder* do Partner Portal para gerar um link `gyg.me/...`.

2. No painel `/admin` (ou direto no Supabase Studio), insira em `affiliate_links`:
   - `category`: `flight_domestic_corporate`, `flight_domestic_leisure`, `hotel` ou `activity`.
   - `title`, `description`, `image_url`.
   - `tracking_url`: o link de afiliado gerado no painel.
   - `embed_code`: código do widget (Travelpayouts / GetYourGuide), se quiser exibir o widget vivo.
   - `price_hint`: preço inicial, opcional.
   - `active`: `true`.
   - `featured`: `true` para aparecer na home.

3. Se for voo, associe a `route_id` previamente cadastrada.

4. O site usa ISR de 5 minutos (`revalidate = 300`) — uma oferta nova aparece no ar em até 5 minutos, sem `git push`.

## Widgets de parceiros

- `TravelpayoutsWidget` e `GetYourGuideWidget` exibem o `embed_code` cadastrado no banco.
- Se o campo estiver vazio, a página mostra apenas os cards do `OfferCard`.
- O `EmbedWidget` injeta o script e recria as tags `<script>` para que carreguem corretamente.

## Deploy

1. Root Directory na Vercel deve ser `site` (não a raiz do repositório).
2. Cadastre as variáveis de ambiente em **Settings → Environment Variables**.
3. Todo `git push` na `master` gera um novo deploy automático.

## Dados e cache

- Páginas de ofertas são revalidadas a cada 5 minutos.
- Se o Supabase não estiver configurado, o site usa dados mock do `src/lib/data.ts`.
