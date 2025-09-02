"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function useHistory() {
  const pathname = usePathname();
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    if (
      pathname &&
      historyRef.current[historyRef.current.length - 1] !== pathname &&
      !pathname.includes("create") &&
      !pathname.includes("edit") // skip create pages
    ) {
      historyRef.current.push(pathname);
    }
  }, [pathname]);

  return historyRef.current;
}
