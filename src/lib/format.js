const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPrice = (value) => usd.format(Number(value) || 0);

export function imageAt(url, width) {
  if (!url || !URL.canParse(url)) return url;
  const parsed = new URL(url);
  if (parsed.hostname !== "images.unsplash.com") return url;
  parsed.searchParams.set("w", width);
  return parsed.toString();
}
