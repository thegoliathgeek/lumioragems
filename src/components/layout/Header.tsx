"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Prevent the page behind the drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-luxe)]",
        scrolled || menuOpen
          ? "border-b border-rose-200 bg-ivory-100/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-ivory-50"
      >
        Skip to content
      </a>

      <Container width="wide">
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-[1.35rem] tracking-[0.3em] text-ink-900"
          >
            LUMIORA
          </Link>

          <div className="flex items-center gap-5">
            <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
              {navigation.map((item) => (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300",
                      pathname.startsWith(item.href)
                        ? "text-gold-600"
                        : "text-ink-600 hover:text-ink-900",
                    )}
                  >
                    {item.label}
                    {item.children.length ? <ChevronDown aria-hidden className="size-3 opacity-60" /> : null}
                  </Link>

                  {item.children.length ? (
                    <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="border border-rose-200 bg-ivory-50 py-3 shadow-(--shadow-soft)">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2 text-xs text-ink-600 transition-colors hover:bg-rose-50 hover:text-gold-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="hidden sm:block">
              <CurrencySwitcher />
            </div>

            <Link
              href="/contact"
              className="hidden border border-gold-400/60 px-5 py-2.5 text-[0.66rem] uppercase tracking-[0.2em] text-ink-800 transition-all duration-500 hover:bg-gold-500 hover:text-ivory-50 sm:inline-block"
            >
              Enquire
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-1 text-ink-800 lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* ---- mobile drawer ---- */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-rose-200 bg-ivory-100 lg:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="py-4">
            {navigation.map((item) => (
              <div key={item.href} className="border-b border-rose-200 last:border-0">
                <div className="flex items-center justify-between">
                  <Link href={item.href} className="py-4 text-sm uppercase tracking-[0.16em] text-ink-800">
                    {item.label}
                  </Link>
                  {item.children.length ? (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={openGroup === item.href}
                      onClick={() => setOpenGroup(openGroup === item.href ? null : item.href)}
                      className="p-3 text-ink-500"
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform duration-300", openGroup === item.href && "rotate-180")}
                      />
                    </button>
                  ) : null}
                </div>

                {item.children.length && openGroup === item.href ? (
                  <div className="pb-4 pl-4">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block py-2.5 text-sm text-ink-500">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="border-t border-rose-200 py-6">
            <p className="eyebrow mb-3">Currency</p>
            <CurrencySwitcher variant="inline" />
          </div>
        </Container>
      </div>
    </header>
  );
}
