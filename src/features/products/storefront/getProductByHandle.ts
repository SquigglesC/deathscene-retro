import { graphql } from "../../../graphql/storefront";

export const ProductByHandleQuery = graphql(`
  query productByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      description
      publishedAt
      featuredImage {
        altText
        width
        height
        url
      }
      handle
      totalInventory
      tags
      variants(first: 100) {
        edges {
          node {
            id
            title
            quantityAvailable
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      metafields(identifiers: [{ namespace: "custom", key: "release_date" }]) {
        key
        value
      }
      images(first: 100) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`);
