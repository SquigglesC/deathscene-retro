import { graphql } from "../../../graphql/storefront";

export const AllProductsQuery = graphql(`
  query AllProducts {
    products(first: 25) {
      nodes {
        id
        title
        handle
        updatedAt
        tags
        totalInventory
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 2) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
            }
          }
        }
        metafields(
          identifiers: [
            { namespace: "custom", key: "release_date" }
          ]
        ) {
          key
          value
        }
      }
    }
  }
`);