import { useList } from "../context/list-context";
import { formatPrice } from "../lib/format";
import ProductImage from "./ui/ProductImage";
import Rating from "./ui/Rating";
import { CheckIcon, PlusIcon } from "./ui/Icons";

const ProductCard = ({ product, onSelect }) => {
  const { add, find } = useList();
  const inList = find(product.id);

  return (
    <article className="group">
      <button
        onClick={() => onSelect(product.id)}
        aria-label={`View ${product.title}`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-surface/90 py-2.5 text-center text-sm font-medium opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Quick view
        </span>
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-medium">{product.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</p>
        </div>
        <p className="shrink-0 font-medium tabular-nums">{formatPrice(product.price)}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Rating value={product.rating} />
        <button
          onClick={() => add(product)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition ${
            inList ? "bg-accent text-on-accent" : "border border-line hover:bg-sunken"
          }`}
        >
          {inList ? <CheckIcon width={14} height={14} /> : <PlusIcon width={14} height={14} />}
          {inList ? `In list · ${inList.qty}` : "Add to list"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
