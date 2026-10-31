import useCatalog from "../../hooks/useCatalog";
import { formatPrice } from "../../lib/format";
import ProductImage from "../ui/ProductImage";
import Rating from "../ui/Rating";
import { ArrowRightIcon } from "../ui/Icons";

const TILES = ["col-span-3 row-span-2", "col-span-2", "col-span-2"];

const Hero = ({ onSelect, onAddProduct }) => {
  const { featured, count, avgRating, isPending } = useCatalog();
  const top = featured[0];

  const stats = [
    { label: "Products", value: count || "—" },
    { label: "Avg. rating", value: count ? avgRating.toFixed(1) : "—" },
    { label: "Delivery", value: "48h" },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 size-[38rem] rounded-full bg-accent/40 blur-3xl dark:bg-accent/10"
      />

      <div className="container-page relative grid items-center gap-14 pb-20 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="eyebrow inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-accent ring-4 ring-accent/30" />
            New season · {new Date().getFullYear()}
          </p>

          <h1 className="mt-6 animate-fade-up font-display text-[3.25rem] leading-[0.95] tracking-tight [animation-delay:80ms] sm:text-7xl lg:text-[5.5rem]">
            Everyday essentials, <em className="text-muted">thoughtfully</em> curated.
          </h1>

          <p className="mt-6 max-w-lg animate-fade-up text-lg leading-relaxed text-muted [animation-delay:160ms]">
            Phones, laptops, skincare and pantry staples — handpicked, honestly priced, and saved to one
            beautifully simple shopping list.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <a href="#shop" className="btn btn-primary group h-12 px-6">
              Shop the collection
              <ArrowRightIcon className="transition group-hover:translate-x-0.5" />
            </a>
            <button onClick={onAddProduct} className="btn btn-ghost h-12 px-6">
              Sell a product
            </button>
          </div>

          <dl className="mt-12 grid max-w-md animate-fade-up grid-cols-3 divide-x divide-line border-y border-line [animation-delay:320ms]">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-4 first:pl-0">
                <dt className="text-xs text-muted">{stat.label}</dt>
                <dd className="mt-1 font-display text-3xl tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms] lg:col-span-6">
          <div className="grid h-[26rem] grid-cols-5 grid-rows-2 gap-3 sm:h-[34rem] sm:gap-4">
            {featured.length
              ? featured.map((product, i) => (
                  <button
                    key={product.id}
                    onClick={() => onSelect(product.id)}
                    aria-label={`View ${product.title}`}
                    className={`${TILES[i]} group relative overflow-hidden rounded-3xl bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                  >
                    <ProductImage
                      src={product.thumbnail}
                      alt={product.title}
                      width={i === 0 ? 1000 : 600}
                      className="h-full w-full transition duration-700 ease-out group-hover:scale-105"
                    />
                  </button>
                ))
              : TILES.map((tile, i) => (
                  <div key={i} className={`${tile} rounded-3xl bg-sunken ${isPending ? "animate-pulse" : ""}`} />
                ))}
          </div>

          {top && (
            <button
              onClick={() => onSelect(top.id)}
              className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-line bg-surface/85 p-3 pr-5 text-left shadow-xl shadow-black/5 backdrop-blur-xl transition hover:-translate-y-0.5 sm:left-6 sm:right-auto sm:w-[22rem]"
            >
              <ProductImage src={top.thumbnail} alt={top.title} width={160} className="size-14 shrink-0 rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="eyebrow block text-[10px]">Top rated</span>
                <span className="mt-0.5 block truncate font-medium">{top.title}</span>
                <span className="mt-1 flex items-center gap-3">
                  <Rating value={top.rating} />
                  <span className="text-sm font-medium tabular-nums">{formatPrice(top.price)}</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
