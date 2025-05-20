import { graphql } from "../../../graphql/admin";

export const orderByConfirmationNumberQuery = graphql(`
  query orderByConfirmationNumber($query: String!) {
    orders(first: 1, query: $query) {
      edges {
        node {
          id
          confirmationNumber
          fulfillments {
            estimatedDeliveryAt
            trackingInfo(first: 1) {
              company
              number
              url
            }
            fulfillmentLineItems(first: 100) {
              edges {
                node {
                  id
                  quantity
                  lineItem {
                    name
                    image {
                      altText
                      height
                      width
                      url
                    }
                  }
                }
              }
            }
            location {
              fulfillmentService {
                callbackUrl
                handle
              }
            }
            events(first: 100) {
              edges {
                node {
                  status
                  city
                  province
                  message
                  happenedAt
                  latitude
                  longitude
                }
              }
            }
          }
        }
      }
    }
  }
`);
