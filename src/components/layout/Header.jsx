import { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import { BagIcon, CloseIcon, MenuIcon, PlusIcon } from "../ui/Icons";
import { useList } from "../../context/list-context";

const NAV = [
  { href: "#shop", label: "Shop" },
  { href: "#why", label: "Why us" },
  { href: "#newsletter", label: "Newsletter" },
];

const Header = ({ onAddProduct, onOpenList }) => {
  const { count } = useList();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        solid ? "border-line bg-canvas/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-sunken hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onAddProduct} className="btn btn-ghost hidden sm:inline-flex">
            <PlusIcon width={16} height={16} />
            Sell a product
          </button>
          <button
            onClick={onOpenList}
            className="btn btn-primary px-4"
            aria-label={`Open shopping list, ${count} item${count === 1 ? "" : "s"}`}
          >
            <BagIcon width={18} height={18} />
            <span className="hidden sm:inline">List</span>
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold tabular-nums text-on-accent">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="btn btn-ghost size-11 p-0 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-page animate-fade-in pb-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 transition hover:bg-sunken"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAddProduct();
                }}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-sunken"
              >
                Sell a product
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
