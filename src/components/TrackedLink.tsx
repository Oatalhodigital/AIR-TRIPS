"use client";

import { trackAffiliateClick } from "@/lib/analytics";

export function TrackedLink({
  href,
  partner,
  category,
  children,
  className,
  rel,
  target,
}: {
  href: string;
  partner: string;
  category: string;
  children: React.ReactNode;
  className?: string;
  rel?: string;
  target?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() =>
        trackAffiliateClick({
          partner,
          category,
          link_url: href,
        })
      }
    >
      {children}
    </a>
  );
}
