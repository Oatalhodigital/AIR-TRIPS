"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SCRIPT_ID = "travelpayouts-drive";
const EXTERNAL_ID = "travelpayouts-drive-external";

export function TravelpayoutsDrive() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    const existingExternal = document.getElementById(EXTERNAL_ID);
    if (existingExternal) existingExternal.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.setAttribute("nowprocket", "");
    script.setAttribute("data-noptimize", "1");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-wpfc-render", "false");
    script.setAttribute("seraph-accel-crit", "1");
    script.setAttribute("data-no-defer", "1");
    script.setAttribute("data-cmp-ab", "2");
    script.textContent = `
      (function () {
        var script = document.createElement("script");
        script.id = "${EXTERNAL_ID}";
        script.async = 1;
        script.setAttribute("data-cmp-ab", "2");
        script.src = 'https://emrldtp.cc/NTcwMDUx.js?t=570051';
        document.head.appendChild(script);
      })();
    `;

    document.head.appendChild(script);
  }, [pathname]);

  return null;
}
