import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../lib/api";
import { useList } from "../context/list-context";
import { SpinnerIcon, TrashIcon } from "./ui/Icons";

const RemoveProduct = ({ product, onRemoved }) => {
  const queryClient = useQueryClient();
  const { remove } = useList();
  const [confirming, setConfirming] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        predicate: (query) => query.queryKey[1] !== id,
      });
      remove(id);
      onRemoved?.(id);
    },
  });

  const cancel = () => {
    setConfirming(false);
    mutation.reset();
  };

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="btn mt-3 h-12 w-full text-red-600 hover:bg-red-500/10 dark:text-red-400"
      >
        <TrashIcon width={18} height={18} />
        Remove from the list
      </button>
    );
  }

  return (
    <div role="alertdialog" aria-label="Confirm removal" className="mt-3 animate-fade-in rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
      <p className="text-sm">
        Remove <span className="font-medium">{product.title}</span> from the store? This can’t be undone.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => mutation.mutate(product.id)}
          disabled={mutation.isPending}
          className="btn h-10 flex-1 bg-red-600 text-white hover:bg-red-700"
        >
          {mutation.isPending && <SpinnerIcon width={16} height={16} />}
          {mutation.isPending ? "Removing…" : "Yes, remove"}
        </button>
        <button onClick={cancel} disabled={mutation.isPending} className="btn btn-ghost h-10 flex-1">
          Cancel
        </button>
      </div>

      {mutation.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          Couldn’t remove the product: {mutation.error.message}
        </p>
      )}
    </div>
  );
};

export default RemoveProduct;
