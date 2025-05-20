import { QueryClient, useQuery } from "@tanstack/react-query";
import upsertCart from "../utils/upsertCart";

export const queryClient = new QueryClient();

export const useCart = () => {
  const cartId = sessionStorage.getItem("cartId") || "";
  
  return useQuery(
    {
      queryKey: ["cart", cartId],
      queryFn: async () => {
        const cart = await upsertCart(cartId);
        if (!cart) return;
        return cart;
      },
    },
    queryClient
  );
};
