import Logo from "../ui/Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "#shop" },
      { label: "Top rated", href: "#top" },
      { label: "Why us", href: "#why" },
    ],
  },
  {
    title: "Stay in touch",
    links: [{ label: "The weekly edit", href: "#newsletter" }],
  },
  {
    title: "Built with",
    links: [
      { label: "TanStack Query", href: "https://tanstack.com/query" },
      { label: "json-server", href: "https://github.com/typicode/json-server" },
      { label: "Unsplash", href: "https://unsplash.com" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-line bg-surface">
    <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Logo />
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Everyday essentials, thoughtfully curated — and one tidy shopping list to keep track of it all.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="eyebrow">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(external && { target: "_blank", rel: "noreferrer" })}
                      className="text-ink/80 transition hover:text-ink"
                    >
                      {link.label}
                      {external && <span aria-hidden="true"> ↗</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ShoppingList. Product photography via Unsplash.</p>
        <a href="#top" className="transition hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
