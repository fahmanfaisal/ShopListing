import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../lib/api";

export default function useCatalog() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products", "all"],
    queryFn: fetchAllProducts,
  });

  const stats = useMemo(() => {
    const products = data ?? [];
    const count = products.length;
    const avgRating = count
      ? products.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / count
      : 0;
    const seen = new Set();
    const featured = products
      .filter((p) => p.thumbnail)
      .sort((a, b) => b.rating - a.rating)
      .filter((p) => !seen.has(p.thumbnail) && seen.add(p.thumbnail))
      .slice(0, 3);

    return { count, avgRating, featured };
  }, [data]);

  return { ...stats, isPending, isError };
}
