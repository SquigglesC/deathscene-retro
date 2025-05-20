import { execute } from "../../../graphql/execute";
import { cartCreateMutation } from "../storefront/createCart";
import { getCartByIdQuery } from "../storefront/getCartById";

export default async function upsertCart(cartId: string) {
  if (!cartId) {
    const res = await execute(cartCreateMutation, {
      input: {},
    });

    if (
      (res.cartCreate?.userErrors && res.cartCreate.userErrors.length > 0) ||
      !res.cartCreate?.cart
    ) {
      console.error(res.cartCreate?.userErrors || "Failed to create cart");
      return;
    }

    sessionStorage.setItem("cartId", res.cartCreate.cart.id);
    return res.cartCreate.cart;
  }
  const res = await execute(getCartByIdQuery, {
    cartId,
  });

  if (!res.cart) {
    console.error("Failed to fetch cart");
    return;
  }

  return res.cart;
}
