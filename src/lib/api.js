import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
});

export const PER_PAGE = 6;

export const fetchProductsPage = async (page) => {
  const response = await api.get("/products", { params: { _page: page, _per_page: PER_PAGE } });
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = (product) => api.post("/products", product);

export const deleteProduct = (id) => api.delete(`/products/${id}`);
