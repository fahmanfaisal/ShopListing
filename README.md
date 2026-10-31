<div align="center">

<img src="use-react-query/public/favicon.svg" alt="ShoppingList logo" width="72" />

# ShoppingList

**Everyday essentials, thoughtfully curated — and one tidy list to keep track of it all.**

A modern storefront landing page built with React and TanStack Query, backed by a json-server REST API with product photography from Unsplash.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

![ShoppingList landing page](docs/screenshot.png)

## Overview

ShoppingList is a single-page shop: browse a paginated product catalogue, open any product for details, save items to a personal shopping list, and publish new products from the browser. It was built as a hands-on project for **server-state management with TanStack Query**, so caching, pagination, prefetching and mutations are all handled the React Query way.

## Features

- **Landing page** — hero with live top-rated picks, highlights strip, product grid, "why us" section, newsletter section (UI only) and footer.
- **Paginated catalogue** — smooth paging that keeps the current page visible while the next one loads, with the following page prefetched in the background.
- **Product details** — accessible modal dialog (Esc / backdrop to close, focus restored).
- **Sell a product** — slide-over form with live image preview; the catalogue refreshes instantly after publishing.
- **Shopping list** — add items, change quantities and see a running total; saved in the browser so it survives reloads.
- **Live stats** — product count and average rating are calculated from the API, not hard-coded.
- **Polished UI** — light and dark themes follow the system setting, responsive from phone to desktop, skeleton loaders, image fallbacks and reduced-motion support.

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | [React 18](https://react.dev), [Vite 5](https://vitejs.dev), [Tailwind CSS 3](https://tailwindcss.com) |
| Server state | [TanStack Query ↗](https://tanstack.com/query) (React Query v5) + [Axios](https://axios-http.com) |
| Mock REST API | [json-server ↗](https://github.com/typicode/json-server) |
| Product images | [Unsplash ↗](https://unsplash.com/developers) API |
| Typography | [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and [Geist](https://fonts.google.com/specimen/Geist) |

### How TanStack Query is used

| Pattern | Where |
| --- | --- |
| `useQuery` with structured keys (`["products", { page }]`, `["products", id]`) | Product grid, details modal |
| `placeholderData: keepPreviousData` for flicker-free pagination | `ProductList.jsx` |
| `prefetchQuery` for the next page | `ProductList.jsx` |
| `useMutation` + `invalidateQueries({ queryKey: ["products"] })` | `AddProduct.jsx` |
| Shared cached query reused by several components | `hooks/useCatalog.js` (hero + stats) |
| React Query Devtools | `main.jsx` (bottom-right button in dev) |

## Project structure

```
shoppingList/
├── server/                     # Mock REST API (json-server)
│   ├── database/data.json      # Products database
│   ├── scripts/
│   │   └── unsplash-thumbnails.mjs   # Fills product thumbnails from Unsplash
│   └── .env                    # UNSPLASH_ACCESS_KEY (not committed)
│
└── use-react-query/            # React frontend
    ├── index.html
    ├── tailwind.config.js      # Design tokens (colors, fonts, animations)
    └── src/
        ├── App.jsx             # Page composition + modals/drawers
        ├── main.jsx            # QueryClient, providers, devtools
        ├── index.css           # Theme variables (light/dark) + component classes
        ├── lib/                # API client and formatters
        ├── hooks/              # useCatalog
        ├── context/            # Shopping list state (localStorage)
        └── components/
            ├── layout/         # Header, Footer
            ├── sections/       # Hero, Marquee, Features, Newsletter
            ├── ui/             # Logo, Modal, Rating, ProductImage, Icons…
            ├── ProductList.jsx
            ├── ProductCard.jsx
            ├── ProductDetails.jsx
            ├── AddProduct.jsx
            └── ShoppingList.jsx
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 22 or newer
- An [Unsplash developer](https://unsplash.com/developers) Access Key — only needed to refresh product images

### 1. Start the API

```bash
cd server
npm install
npm start
```

The API runs at **http://localhost:3000**.

### 2. Start the frontend

In a second terminal:

```bash
cd use-react-query
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

### 3. (Optional) Refresh product images from Unsplash

1. Create an app at [unsplash.com/oauth/applications](https://unsplash.com/oauth/applications) and copy its **Access Key** (the Secret Key isn't needed).
2. Create `server/.env`:

   ```env
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

3. From the project root, run:

   ```bash
   cd server
   npm run thumbnails
   ```

A running API picks up the new images automatically — json-server watches `data.json` for changes.

The script searches Unsplash for each product title, falls back to a generic product photo when nothing matches, and writes the image URL into `thumbnail`. A backup is saved to `database/data.backup.json` first.

> Demo Unsplash apps are limited to **50 requests per hour**; one run uses roughly one request per product.

## API reference

json-server exposes full REST endpoints for the `products` collection:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products?_page=1&_per_page=6` | Paginated list (`data`, `items`, `pages`, `prev`, `next`) |
| `GET` | `/products` | All products |
| `GET` | `/products/:id` | Single product |
| `POST` | `/products` | Create a product |
| `PATCH` / `PUT` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Delete a product |

**Product shape**

```json
{
  "id": "1",
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "rating": 4.69,
  "thumbnail": "https://images.unsplash.com/photo-…"
}
```

## Configuration

| Variable | Where | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_API_URL` | `use-react-query/.env` | `http://localhost:3000` | Base URL of the products API |
| `UNSPLASH_ACCESS_KEY` | `server/.env` | — | Used by `npm run thumbnails` |

Colors live as CSS variables in `use-react-query/src/index.css`, so the whole theme can be changed in one place.

## Scripts

| Folder | Command | Description |
| --- | --- | --- |
| `server` | `npm start` | Start json-server and watch `data.json` |
| `server` | `npm run thumbnails` | Replace product thumbnails with Unsplash photos |
| `use-react-query` | `npm run dev` | Start the Vite dev server |
| `use-react-query` | `npm run build` | Production build to `dist/` |
| `use-react-query` | `npm run preview` | Preview the production build |
| `use-react-query` | `npm run lint` | Run ESLint |

## Roadmap

- [ ] Connect the newsletter form to an email provider
- [ ] Search and category filters
- [ ] Edit and delete products from the UI
- [ ] Checkout flow for the shopping list

## Credits

- Product photography from [Unsplash](https://unsplash.com) — photos belong to their respective photographers.
- Mock API powered by [json-server](https://github.com/typicode/json-server).
- Data fetching and caching by [TanStack Query](https://tanstack.com/query).

## License

[MIT](https://opensource.org/licenses/MIT) © Fahman
