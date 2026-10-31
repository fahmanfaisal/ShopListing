import { ArrowRightIcon } from "../ui/Icons";

const Newsletter = () => (
  <section id="newsletter" className="container-page pb-24 lg:pb-32">
    <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-canvas sm:px-12 lg:px-16 lg:py-20">
      <div aria-hidden="true" className="absolute -left-32 -top-32 size-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative grid items-end gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-canvas/60">The weekly edit</p>
          <h2 className="mt-4 font-display text-5xl leading-none tracking-tight sm:text-6xl">
            New arrivals, <em className="text-canvas/60">once a week.</em>
          </h2>
          <p className="mt-4 max-w-md text-canvas/70">
            Five products worth your attention, every Friday. No spam — unsubscribe anytime.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 flex-1 rounded-full border border-canvas/15 bg-canvas/5 px-5 text-sm text-canvas placeholder:text-canvas/40 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="button" className="btn btn-accent h-12 px-6">
            Subscribe
            <ArrowRightIcon width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Newsletter;
