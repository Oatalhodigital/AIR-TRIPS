export const metadata = {
  title: "Política de Privacidade — AIR-TRIP",
  description: "Política de Privacidade do AIR-TRIP, em conformidade com a LGPD.",
};

export default function PoliticaPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">
        Política de Privacidade
      </h1>
      <div className="space-y-4 text-gray-600">
        <p>
          O AIR-TRIP respeita sua privacidade. Esta página explica como coletamos,
          usamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de
          Proteção de Dados (LGPD).
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Quais dados coletamos?
        </h2>
        <p>
          Coletamos os dados que você nos envia voluntariamente pelo formulário de
          contato, como nome, e-mail, WhatsApp, empresa e mensagem.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Por que coletamos?
        </h2>
        <p>
          Para responder sua solicitação de cotação e, eventualmente, enviar
          comunicações sobre ofertas de viagem, caso você autorize.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Cookies e rastreamento
        </h2>
        <p>
          Utilizamos Google Analytics 4, Meta Pixel e Travelpayouts Drive para
          entender como o site é usado, otimizar campanhas e converter
          automaticamente menções a destinos e serviços de viagem em links de
          afiliado. Essas ferramentas podem utilizar cookies de acordo com suas
          próprias políticas.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Seus direitos
        </h2>
        <p>
          Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus
          dados a qualquer momento, enviando um e-mail para o contato indicado neste
          site.
        </p>
      </div>
    </section>
  );
}
