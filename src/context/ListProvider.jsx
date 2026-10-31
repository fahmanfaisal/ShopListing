import { useEffect, useMemo, useState } from "react";
import { ListContext } from "./list-context";

const STORAGE_KEY = "listed:shopping-list";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const save = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
};

const ListProvider = ({ children }) => {
  const [items, setItems] = useState(load);

  useEffect(() => {
    save(items);
  }, [items]);

  const value = useMemo(() => {
    const add = (product) =>
      setItems((current) =>
        current.some((item) => item.id === product.id)
          ? current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
          : [
              ...current,
              {
                id: product.id,
                title: product.title,
                price: Number(product.price) || 0,
                thumbnail: product.thumbnail,
                qty: 1,
              },
            ]
      );

    const setQty = (id, qty) =>
      setItems((current) =>
        qty <= 0
          ? current.filter((item) => item.id !== id)
          : current.map((item) => (item.id === id ? { ...item, qty } : item))
      );

    const remove = (id) => setItems((current) => current.filter((item) => item.id !== id));

    return {
      items,
      add,
      setQty,
      remove,
      clear: () => setItems([]),
      find: (id) => items.find((item) => item.id === id),
      count: items.reduce((n, item) => n + item.qty, 0),
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    };
  }, [items]);

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListProvider;
