import { graphql } from "../../../graphql/storefront";

export const getCartByIdQuery = graphql(`
  query getCartById($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        checkoutChargeAmount {
          currencyCode
          amount
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              __typename
              ... on ProductVariant {
                price {
                  amount
                  currencyCode
                }
                title
                product {
                  id
                  title
                  handle
                  featuredImage {
                    id
                    url
                    altText
                    width
                    height
                  }
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
