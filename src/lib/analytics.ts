/* eslint-disable @typescript-eslint/no-explicit-any */

export function trackAffiliateClick({
  partner,
  category,
  link_url,
}: {
  partner: string;
  category: string;
  link_url: string;
}) {
  if (typeof window === "undefined") return;

  try {
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", "affiliate_click", {
        partner,
        category,
        link_url,
      });
    }
  } catch {
    // ignore
  }

  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("trackCustom", "AffiliateClick", {
        partner,
        category,
        link_url,
      });
    }
  } catch {
    // ignore
  }
}
