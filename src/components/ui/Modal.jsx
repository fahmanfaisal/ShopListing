import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./Icons";

const Modal = ({ open, onClose, label, variant = "center", leaving = false, children }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const onKey = (event) => event.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDrawer = variant === "drawer";
  const enter = isDrawer ? "animate-slide-in" : "animate-scale-in";

  const handleAnimationEnd = (event) => {
    if (leaving && event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={`fixed inset-0 z-50 flex ${isDrawer ? "justify-end" : "items-center justify-center p-4 sm:p-6"}`}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${leaving ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onAnimationEnd={handleAnimationEnd}
        className={`${leaving ? "pointer-events-none animate-scale-out" : enter} ${
          isDrawer
            ? "relative flex h-full w-full max-w-md flex-col bg-surface shadow-2xl outline-none"
            : "relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-surface shadow-2xl outline-none"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const DrawerHeader = ({ title, subtitle, onClose }) => (
  <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
    <div>
      <h2 className="font-display text-3xl leading-none">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
    </div>
    <button
      onClick={onClose}
      aria-label="Close"
      className="grid size-10 shrink-0 place-items-center rounded-full transition hover:bg-sunken"
    >
      <CloseIcon />
    </button>
  </div>
);

export default Modal;
