export const LogoMark = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
    <rect width="32" height="32" rx="9" className="fill-accent" />
    <path d="M2 11C2 6 6 2 11 2h10c2 0 4 .6 5.5 1.7C20 3.5 9 6 2 15z" className="fill-white/30" />
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" className="stroke-on-accent">
      <path d="M9.5 12.5h13l-1.1 10.4a2 2 0 01-2 1.8h-6.8a2 2 0 01-2-1.8z" strokeWidth="1.9" />
      <path d="M12.75 12.5v-1.25a3.25 3.25 0 016.5 0v1.25" strokeWidth="1.9" />
      <path d="M13 18.4l2.1 2.1 4-4.2" strokeWidth="2.2" />
    </g>
  </svg>
);

const Logo = () => (
  <a href="#top" aria-label="ShoppingList — back to top" className="group inline-flex items-center gap-2.5">
    <LogoMark className="size-9 shrink-0 drop-shadow-sm transition duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105" />
    <span className="text-[1.15rem] font-semibold tracking-tight">
      Shopping
      <span className="font-display text-[1.45rem] font-normal italic leading-none">List</span>
    </span>
  </a>
);

export default Logo;
