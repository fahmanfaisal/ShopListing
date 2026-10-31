const SectionHeading = ({ eyebrow, title, children, aside }) => (
  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {children && <p className="mt-4 max-w-xl text-muted">{children}</p>}
    </div>
    {aside}
  </div>
);

export default SectionHeading;
