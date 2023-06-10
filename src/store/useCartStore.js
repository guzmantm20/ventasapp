import { create } from "zustand";
const useCartStore = create((set, get) => ({
  products: [],
  totalSell: 0,
  addToCart: (product) => {
    const { totalSell } = get();
    const newTotal = totalSell + product.sellPrice * product.stock;
    set({ totalSell: newTotal });
    set((state) => ({ products: [...state.products, product] }));
  },
  removeFromCart: (productId) => {
    const { totalSell, products } = get();
    const product = products.filter((p) => p.id === productId)[0]
    const newTotal = totalSell - product.sellPrice * product.stock;
    set({ totalSell: newTotal });
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },
  clearCart: () => set({ products: [], totalSell: 0 }),
}));

export default useCartStore;
