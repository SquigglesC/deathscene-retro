import { graphql } from "../../../graphql/storefront";

export const cartCreateMutation = graphql(`
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
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
                    variants {
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
      userErrors {
        field
        message
      }
    }
  }
`);
