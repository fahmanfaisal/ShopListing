import { SparkleIcon } from "../ui/Icons";

const ITEMS = [
  "Free delivery over $50",
  "30-day returns",
  "Curated every week",
  "Secure payments",
  "Carbon-neutral shipping",
  "Rated by real shoppers",
];

const Marquee = () => (
  <div className="overflow-hidden border-y border-line bg-surface py-4" aria-label="Store highlights">
    <ul className="flex w-max animate-marquee hover:[animation-play-state:paused]">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <li
          key={i}
          aria-hidden={i >= ITEMS.length}
          className="flex items-center gap-3 whitespace-nowrap pr-12 text-sm text-muted"
        >
          <SparkleIcon width={14} height={14} className="text-ink" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Marquee;
