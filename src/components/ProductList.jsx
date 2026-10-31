import { useEffect, useRef, useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { PER_PAGE, fetchProductsPage } from "../lib/api";
import ProductCard from "./ProductCard";
import SectionHeading from "./ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon } from "./ui/Icons";

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/5] rounded-3xl bg-sunken" />
    <div className="mt-4 h-4 w-2/3 rounded bg-sunken" />
    <div className="mt-2 h-3 w-1/2 rounded bg-sunken" />
  </div>
);

const ProductList = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    data: products,
    error,
    isPending,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: () => fetchProductsPage(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!products?.next) return;
    queryClient.prefetchQuery({
      queryKey: ["products", { page: products.next }],
      queryFn: () => fetchProductsPage(products.next),
    });
  }, [products, queryClient]);

  const goTo = (target) => {
    setPage(target);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const from = products ? (page - 1) * PER_PAGE + 1 : 0;
  const to = products ? Math.min(page * PER_PAGE, products.items) : 0;

  return (
    <section id="shop" ref={sectionRef} className="container-page pt-24 lg:pt-32">
      <SectionHeading
        eyebrow="The collection"
        title={
          <>
            Shop all <em className="text-muted">products</em>
          </>
        }
        aside={
          products?.items > 0 && (
            <p className="text-sm tabular-nums text-muted">
              Showing {from}–{to} of {products.items}
            </p>
          )
        }
      >
        Tap any product for details, or add it straight to your shopping list.
      </SectionHeading>

      {error ? (
        <div className="mt-12 rounded-3xl border border-dashed border-line p-10 text-center">
          <p className="font-display text-3xl">We couldn’t load the shop.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {error.message}. Is the API running? Start it with{" "}
            <code className="rounded bg-sunken px-1.5 py-0.5">npm start</code> inside{" "}
            <code className="rounded bg-sunken px-1.5 py-0.5">/server</code>.
          </p>
          <button onClick={() => refetch()} className="btn btn-primary mt-6">
            Try again
          </button>
        </div>
      ) : (
        <ul
          className={`mt-12 grid gap-x-6 gap-y-12 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
            isPlaceholderData ? "opacity-60" : ""
          }`}
        >
          {isPending
            ? Array.from({ length: PER_PAGE }, (_, i) => (
                <li key={i}>
                  <CardSkeleton />
                </li>
              ))
            : products.data.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} onSelect={onSelect} />
                </li>
              ))}
        </ul>
      )}

      {products?.pages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-6"
        >
          <button onClick={() => goTo(products.prev)} disabled={!products.prev} className="btn btn-ghost">
            <ChevronLeftIcon width={18} height={18} />
            Previous
          </button>

          <ol className="hidden items-center gap-1 sm:flex">
            {Array.from({ length: products.pages }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  onClick={() => goTo(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={`grid size-10 place-items-center rounded-full text-sm tabular-nums transition ${
                    n === page ? "bg-ink text-canvas" : "text-muted hover:bg-sunken hover:text-ink"
                  }`}
                >
                  {n}
                </button>
              </li>
            ))}
          </ol>
          <span className="text-sm tabular-nums text-muted sm:hidden">
            Page {page} of {products.pages}
          </span>

          <button onClick={() => goTo(products.next)} disabled={!products.next} className="btn btn-ghost">
            Next
            <ChevronRightIcon width={18} height={18} />
          </button>
        </nav>
      )}
    </section>
  );
};

export default ProductList;
