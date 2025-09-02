"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { storage } from "@/utils/sessionStorage";

const regexInFolder = /^\/folder\/\d+$/;
const regexInRecipe = /^\/recipe\/\d+$/;
const regexInRecipeEdit = /^\/recipe\/edit\/\d+$/;

export default function NavTracker() {
  const pathname = usePathname();

  // Prevent duplicate writes when React Strict Mode re-runs effects in dev
  const lastWrittenRef = useRef<string>("");

  useEffect(() => {
    // Only process when path actually changes
    if (lastWrittenRef.current === pathname) return;
    lastWrittenRef.current = pathname;

    if (pathname === "/") {
      storage.set("inFolder", "/");
      storage.set("navLink", "/");
      return;
    }

    if (regexInFolder.test(pathname)) {
      storage.set("inFolder", pathname);
      storage.set("navLink", "/");
      return;
    }

    if (regexInRecipe.test(pathname)) {
      const folderPath = storage.get<string>("inFolder");
      if (folderPath) {
        storage.set("navLink", folderPath);
      } else {
        storage.set("navLink", "/");
      }
      return;
    }
    if (regexInRecipeEdit.test(pathname)) {
      const newPath = pathname.replace(/^\/recipe\/edit\/(\d+)$/, "/recipe/$1");
      storage.set("navLink", newPath);
      return;
    }
    storage.set("navLink", "/");
  }, [pathname]);
  return null;
}
