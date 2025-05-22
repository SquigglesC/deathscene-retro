import type { APIRoute } from "astro";
import { execute } from "../../graphql/execute";

const StorefrontTestQuery = `
  query DEBUG {
    products(first: 100) {
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
        variants(first: 100) {
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
`;

export async function GET() {
  try {
    const domain = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
    const accessToken = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

    if (!domain) {
      return new Response(JSON.stringify({ error: "Missing domain" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Missing access token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log(`Executing query to ${domain} with token starting with ${accessToken.substring(0, 4)}...`)

    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({ query: StorefrontTestQuery }),
    })

    const responseText = await response.text()
    let parsedResponse

    try {
      parsedResponse = JSON.parse(responseText)
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: "Failed to parse response",
          status: response.status,
          statusText: response.statusText,
          responseText: responseText.substring(0, 1000) + (responseText.length > 1000 ? "..." : ""),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (parsedResponse.errors) {
      return new Response(
        JSON.stringify({
          error: "GraphQL errors",
          errors: parsedResponse.errors,
          status: response.status,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: response.status,
        data: parsedResponse.data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (e) {
    console.error("❌ Test execute failed:", e)
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
