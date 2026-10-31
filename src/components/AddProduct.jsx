import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../lib/api";
import ProductImage from "./ui/ProductImage";
import { DrawerHeader } from "./ui/Modal";
import { SpinnerIcon } from "./ui/Icons";

const EMPTY = { title: "", description: "", price: "", rating: 5, thumbnail: "" };

const Field = ({ label, htmlFor, hint, children }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {label}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
  </div>
);

const AddProduct = ({ onClose, onCreated }) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState(EMPTY);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setState(EMPTY);
      onCreated?.(data.id);
    },
  });

  const handleChange = (event) => {
    const { name, type, value, valueAsNumber } = event.target;
    setState((current) => ({
      ...current,
      [name]: type === "number" ? (Number.isNaN(valueAsNumber) ? "" : valueAsNumber) : value,
    }));
  };

  const submitData = (event) => {
    event.preventDefault();
    mutation.mutate({
      ...state,
      price: Number(state.price) || 0,
      rating: Number(state.rating) || 0,
      id: crypto.randomUUID(),
    });
  };

  return (
    <>
      <DrawerHeader title="List a product" subtitle="It appears in the shop as soon as you publish." onClose={onClose} />

      <form id="add-product" onSubmit={submitData} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-sunken">
          <ProductImage
            key={state.thumbnail}
            src={state.thumbnail}
            alt={state.title || "Preview"}
            width={800}
            className="h-full w-full"
          />
        </div>

        <Field label="Product name" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            value={state.title}
            onChange={handleChange}
            className="input"
            placeholder="e.g. Linen tote bag"
          />
        </Field>

        <Field label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={3}
            value={state.description}
            onChange={handleChange}
            className="input h-auto resize-none py-3"
            placeholder="What makes it worth buying?"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (USD)" htmlFor="price">
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={state.price}
              onChange={handleChange}
              className="input tabular-nums"
              placeholder="49"
            />
          </Field>
          <Field label="Rating" htmlFor="rating">
            <input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={state.rating}
              onChange={handleChange}
              className="input tabular-nums"
            />
          </Field>
        </div>

        <Field label="Image URL" htmlFor="thumbnail" hint="Paste any image link — an Unsplash URL works great.">
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            value={state.thumbnail}
            onChange={handleChange}
            className="input"
            placeholder="https://images.unsplash.com/…"
          />
        </Field>

        {mutation.isError && (
          <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            Couldn’t save the product: {mutation.error.message}
          </p>
        )}
      </form>

      <div className="border-t border-line p-6">
        <button form="add-product" type="submit" disabled={mutation.isPending} className="btn btn-primary h-12 w-full">
          {mutation.isPending && <SpinnerIcon width={18} height={18} />}
          {mutation.isPending ? "Publishing…" : "Publish product"}
        </button>
      </div>
    </>
  );
};

export default AddProduct;
