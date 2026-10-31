import { useList } from "../context/list-context";
import { formatPrice } from "../lib/format";
import ProductImage from "./ui/ProductImage";
import { DrawerHeader } from "./ui/Modal";
import { BagIcon, MinusIcon, PlusIcon } from "./ui/Icons";

const ShoppingList = ({ onClose }) => {
  const { items, setQty, remove, clear, count, total } = useList();

  return (
    <>
      <DrawerHeader
        title="Your list"
        subtitle={`${count} item${count === 1 ? "" : "s"}`}
        onClose={onClose}
      />

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-sunken">
            <BagIcon width={24} height={24} />
          </span>
          <div>
            <p className="font-display text-3xl">Your list is empty</p>
            <p className="mt-1 text-sm text-muted">Add products as you browse and they’ll show up here.</p>
          </div>
          <a href="#shop" onClick={onClose} className="btn btn-primary">
            Browse products
          </a>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5">
                <ProductImage
                  src={item.thumbnail}
                  alt={item.title}
                  width={200}
                  className="size-20 shrink-0 rounded-2xl"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <p className="truncate font-medium">{item.title}</p>
                    <p className="shrink-0 tabular-nums">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <p className="text-sm text-muted">{formatPrice(item.price)} each</p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-full border border-line">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`Decrease ${item.title}`}
                        className="grid size-8 place-items-center rounded-full transition hover:bg-sunken"
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`Increase ${item.title}`}
                        className="grid size-8 place-items-center rounded-full transition hover:bg-sunken"
                      >
                        <PlusIcon width={14} height={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-sm text-muted underline-offset-4 transition hover:text-ink hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-line p-6">
            <div className="flex items-end justify-between">
              <span className="text-sm text-muted">Estimated total</span>
              <span className="font-display text-4xl leading-none tabular-nums">{formatPrice(total)}</span>
            </div>
            <button onClick={clear} className="btn btn-ghost mt-5 w-full">
              Clear list
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ShoppingList;
