import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/api";
import { formatPrice } from "../lib/format";
import { useList } from "../context/list-context";
import ProductImage from "./ui/ProductImage";
import Rating from "./ui/Rating";
import { CheckIcon, CloseIcon, PlusIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./ui/Icons";

const PERKS = [
  { icon: TruckIcon, text: "Free delivery on orders over $50" },
  { icon: ReturnIcon, text: "30-day, no-questions returns" },
  { icon: ShieldIcon, text: "2-year warranty included" },
];

const ProductDetails = ({ id, onClose }) => {
  const { add, find } = useList();
  const inList = find(id);

  const { data: product, error, isPending } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-square bg-sunken md:aspect-auto md:min-h-[34rem]">
        {isPending && <div className="absolute inset-0 animate-pulse bg-sunken" />}
        {product && (
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            width={1000}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      <div className="relative flex flex-col p-6 sm:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full transition hover:bg-sunken"
        >
          <CloseIcon />
        </button>

        {error ? (
          <div className="my-auto">
            <p className="font-display text-3xl">Couldn’t load this product.</p>
            <p className="mt-2 text-sm text-muted">{error.message}</p>
          </div>
        ) : isPending ? (
          <div className="animate-pulse space-y-4 pt-6">
            <div className="h-3 w-1/3 rounded bg-sunken" />
            <div className="h-10 w-3/4 rounded bg-sunken" />
            <div className="h-4 w-1/2 rounded bg-sunken" />
            <div className="h-24 rounded bg-sunken" />
          </div>
        ) : (
          <>
            <p className="eyebrow">In stock · Ships in 48h</p>
            <h2 className="mt-3 pr-10 font-display text-4xl leading-[1.05] sm:text-5xl">{product.title}</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-medium tabular-nums">{formatPrice(product.price)}</span>
              <span className="text-line">|</span>
              <Rating value={product.rating} />
            </div>
            <p className="mt-6 leading-relaxed text-muted">{product.description || "No description yet."}</p>

            <button onClick={() => add(product)} className="btn btn-primary mt-8 h-12 w-full">
              {inList ? <CheckIcon width={18} height={18} /> : <PlusIcon width={18} height={18} />}
              {inList ? `In your list · ${inList.qty} — add another` : "Add to shopping list"}
            </button>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-muted">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon width={18} height={18} className="text-ink" />
                  {text}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
