import { graphql } from "../../../graphql/storefront";

export const addToCartMutation = graphql(`
  mutation addToCart($cartId: ID!, $variantId: ID!) {
    cartLinesAdd(cartId: $cartId, lines: { merchandiseId: $variantId }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`);
