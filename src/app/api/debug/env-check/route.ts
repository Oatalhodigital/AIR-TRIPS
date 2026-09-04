export const dynamic = "force-dynamic";

export async function GET() {
  const keys = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_GA_ID",
    "NEXT_PUBLIC_META_PIXEL_ID",
  ];

  const result: Record<
    string,
    { present: boolean; length: number }
  > = {};

  for (const key of keys) {
    const value = process.env[key] || "";
    result[key] = { present: value.length > 0, length: value.length };
  }

  return Response.json(result);
}
