// Testa a inserção de oferta sem network_id (simula o bug corrigido)
const SUPABASE_URL = "https://aqykecamgowvetrzrmnc.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeWtlY2FtZ293dmV0cnpybW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODQ1ODEwMiwiZXhwIjoyMTA0MDM0MTAyfQ.IQoXQIGXxphnuKNkrAMe6e-j3h557jcm2pz6BCgpzSo";

async function main() {
  // Teste 1: Inserir oferta SEM network_id (null) — simula o bug corrigido
  console.log("=== Teste 1: Oferta sem network_id (null) ===");
  const body1 = {
    network_id: null,
    category: "activity",
    title: "TESTE QA - Oferta sem rede",
    tracking_url: "https://klook.tpm.li/teste-qa-1",
    raw_url: "https://klook.tpm.li/teste-qa-1",
    active: true,
    featured: false,
  };
  const res1 = await fetch(`${SUPABASE_URL}/rest/v1/affiliate_links`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body1),
  });
  const data1 = await res1.json();
  console.log(`Status: ${res1.status}`);
  console.log(`Response:`, JSON.stringify(data1, null, 2));
  const testId1 = data1?.[0]?.id;

  // Teste 2: Inserir oferta com price_hint vazio (null)
  console.log("\n=== Teste 2: Oferta com price_hint null ===");
  const body2 = {
    network_id: null,
    category: "hotel",
    title: "TESTE QA - Hotel sem preco",
    tracking_url: "https://klook.tpm.li/teste-qa-2",
    raw_url: "https://klook.tpm.li/teste-qa-2",
    price_hint: null,
    active: true,
    featured: false,
  };
  const res2 = await fetch(`${SUPABASE_URL}/rest/v1/affiliate_links`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body2),
  });
  const data2 = await res2.json();
  console.log(`Status: ${res2.status}`);
  console.log(`Response:`, JSON.stringify(data2, null, 2));
  const testId2 = data2?.[0]?.id;

  // Limpeza: apagar os registros de teste
  console.log("\n=== Limpando registros de teste ===");
  for (const id of [testId1, testId2].filter(Boolean)) {
    const delRes = await fetch(
      `${SUPABASE_URL}/rest/v1/affiliate_links?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    console.log(`Delete ${id}: ${delRes.status}`);
  }

  console.log("\n=== Resultado ===");
  if (res1.status === 201 && res2.status === 201) {
    console.log("✅ SUCESSO: Ambas as ofertas salvaram sem erro com network_id=null e price_hint=null");
  } else {
    console.log("❌ FALHA: Alguma inserção falhou");
  }
}

main().catch(console.error);
