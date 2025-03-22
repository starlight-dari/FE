"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DynamicBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const isTargetPage = /^\/main\/\d+$/.test(pathname);

    if (isTargetPage) {
      document.documentElement.classList.add("radial-background");
    } else {
      document.documentElement.classList.remove("radial-background");
    }
  }, [pathname]);

  return null;
}
