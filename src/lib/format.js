const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (value) => usd.format(Number(value) || 0);

const UNSPLASH_PAGE = /^\/photos\/(?:[\w-]*-)?([\w-]{11})\/?$/;

export function imageAt(url, width) {
  if (!url || !URL.canParse(url)) return url;
  const parsed = new URL(url);
  if (["unsplash.com", "www.unsplash.com"].includes(parsed.hostname)) {
    const id = parsed.pathname.match(UNSPLASH_PAGE)?.[1];
    return id ? `https://unsplash.com/photos/${id}/download?w=${width}` : url;
  }
  if (parsed.hostname !== "images.unsplash.com") return url;
  parsed.searchParams.set("w", width);
  return parsed.toString();
}
