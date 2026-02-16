"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="lang-switcher" style={{ display: "flex", gap: "4px" }}>
      <button
        className={`header__lang ${locale === "fr" ? "header__lang--active" : ""}`}
        onClick={() => switchLocale("fr")}
        aria-label="Français"
      >
        FR
      </button>
      <span style={{ color: "var(--text-muted, #9CA3AF)", fontSize: "0.75rem" }}>/</span>
      <button
        className={`header__lang ${locale === "en" ? "header__lang--active" : ""}`}
        onClick={() => switchLocale("en")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
