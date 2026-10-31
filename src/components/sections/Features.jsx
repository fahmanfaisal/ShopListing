import useCatalog from "../../hooks/useCatalog";
import SectionHeading from "../ui/SectionHeading";
import { ReturnIcon, SparkleIcon, TruckIcon } from "../ui/Icons";

const FeatureTile = ({ icon: Icon, title, children }) => (
  <article className="flex min-h-[16rem] flex-col justify-between rounded-3xl border border-line bg-surface p-8">
    <span className="grid size-12 place-items-center rounded-2xl bg-sunken">
      <Icon />
    </span>
    <div>
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  </article>
);

const Features = () => {
  const { count, avgRating } = useCatalog();

  return (
    <section id="why" className="container-page py-24 lg:py-32">
      <SectionHeading
        eyebrow="Why ShoppingList"
        title={
          <>
            Shopping that respects <em className="text-muted">your time.</em>
          </>
        }
      >
        We do the sorting so you don’t have to — fewer tabs, fewer regrets, one tidy list.
      </SectionHeading>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <article className="relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-canvas lg:col-span-2 lg:p-10">
          <SparkleIcon width={28} height={28} className="text-accent" />
          <div className="relative">
            <p className="font-display text-4xl leading-tight sm:text-5xl">“Fewer, better things.”</p>
            <p className="mt-4 max-w-md text-canvas/70">
              Every product is reviewed before it reaches the catalogue. If we wouldn’t buy it, we don’t list it.
            </p>
          </div>
          <div aria-hidden="true" className="absolute -bottom-24 -right-24 size-80 rounded-full border border-canvas/10" />
          <div aria-hidden="true" className="absolute -bottom-10 -right-10 size-52 rounded-full border border-canvas/10" />
        </article>

        <FeatureTile icon={TruckIcon} title="Delivered in 48 hours">
          Free on orders over $50, tracked door to door.
        </FeatureTile>

        <FeatureTile icon={ReturnIcon} title="30-day returns">
          Changed your mind? Send it back — no questions asked.
        </FeatureTile>

        <article className="flex flex-col justify-between gap-6 rounded-3xl bg-accent p-8 text-on-accent sm:flex-row sm:items-end lg:col-span-2 lg:p-10">
          <div>
            <p className="eyebrow text-on-accent/70">Loved by shoppers</p>
            <p className="mt-3 font-display text-7xl leading-none tabular-nums">
              {count ? avgRating.toFixed(1) : "—"}
              <span className="text-3xl">/5</span>
            </p>
          </div>
          <p className="max-w-xs text-on-accent/80">
            Average rating across {count || "all"} products in the catalogue — calculated live from the store.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Features;
