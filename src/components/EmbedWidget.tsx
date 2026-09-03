"use client";

import { useEffect, useRef, useState } from "react";

export function EmbedWidget({ code, fallback }: { code?: string | null; fallback?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!code || !ref.current) return;
    ref.current.innerHTML = code;

    const scripts = ref.current.querySelectorAll("script");
    scripts.forEach((old) => {
      const s = document.createElement("script");
      Array.from(old.attributes).forEach((attr) =>
        s.setAttribute(attr.name, attr.value)
      );
      s.appendChild(document.createTextNode(old.innerHTML));
      old.parentNode?.replaceChild(s, old);
    });

    setLoaded(true);
  }, [code]);

  if (!code) {
    return <>{fallback}</>;
  }

  return (
    <div className="w-full">
      {!loaded && fallback}
      <div
        ref={ref}
        className="w-full"
        style={{ minHeight: 80 }}
      />
    </div>
  );
}
