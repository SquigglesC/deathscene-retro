/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query orderByConfirmationNumber($query: String!) {\n    orders(first: 1, query: $query) {\n      edges {\n        node {\n          id\n          confirmationNumber\n          fulfillments {\n            estimatedDeliveryAt\n            trackingInfo(first: 1) {\n              company\n              number\n              url\n            }\n            fulfillmentLineItems(first: 100) {\n              edges {\n                node {\n                  id\n                  quantity\n                  lineItem {\n                    name\n                    image {\n                      altText\n                      height\n                      width\n                      url\n                    }\n                  }\n                }\n              }\n            }\n            location {\n              fulfillmentService {\n                callbackUrl\n                handle\n              }\n            }\n            events(first: 100) {\n              edges {\n                node {\n                  status\n                  city\n                  province\n                  message\n                  happenedAt\n                  latitude\n                  longitude\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.OrderByConfirmationNumberDocument,
};
const documents: Documents = {
    "\n  query orderByConfirmationNumber($query: String!) {\n    orders(first: 1, query: $query) {\n      edges {\n        node {\n          id\n          confirmationNumber\n          fulfillments {\n            estimatedDeliveryAt\n            trackingInfo(first: 1) {\n              company\n              number\n              url\n            }\n            fulfillmentLineItems(first: 100) {\n              edges {\n                node {\n                  id\n                  quantity\n                  lineItem {\n                    name\n                    image {\n                      altText\n                      height\n                      width\n                      url\n                    }\n                  }\n                }\n              }\n            }\n            location {\n              fulfillmentService {\n                callbackUrl\n                handle\n              }\n            }\n            events(first: 100) {\n              edges {\n                node {\n                  status\n                  city\n                  province\n                  message\n                  happenedAt\n                  latitude\n                  longitude\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.OrderByConfirmationNumberDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query orderByConfirmationNumber($query: String!) {\n    orders(first: 1, query: $query) {\n      edges {\n        node {\n          id\n          confirmationNumber\n          fulfillments {\n            estimatedDeliveryAt\n            trackingInfo(first: 1) {\n              company\n              number\n              url\n            }\n            fulfillmentLineItems(first: 100) {\n              edges {\n                node {\n                  id\n                  quantity\n                  lineItem {\n                    name\n                    image {\n                      altText\n                      height\n                      width\n                      url\n                    }\n                  }\n                }\n              }\n            }\n            location {\n              fulfillmentService {\n                callbackUrl\n                handle\n              }\n            }\n            events(first: 100) {\n              edges {\n                node {\n                  status\n                  city\n                  province\n                  message\n                  happenedAt\n                  latitude\n                  longitude\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').OrderByConfirmationNumberDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
