import type { TypedDocumentString } from "./storefront/graphql";
import type { TypedDocumentString as AdminTypedDocumentString } from "./admin/graphql";
export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(
    `https://${
      import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
    }/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
        "X-Shopify-Storefront-Access-Token": import.meta.env
          .PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );
  
  if (!response.ok) {
    console.error(response);
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data as TResult;
}

export async function executeAdmin<TResult, TVariables>(
  query: AdminTypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(
    `https://${
      import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
    }/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
        "X-Shopify-Access-Token": import.meta.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    console.error(query, await response.text());
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data as TResult;
}

export async function executeAdminUntyped(query: string, variables: object) {
  const response = await fetch(
    `https://${
      import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
    }/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
        "X-Shopify-Access-Token": import.meta.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    console.error(query, await response.json());
    throw new Error("Network response was not ok");
  }

 
  return (await response.json()).data;
}