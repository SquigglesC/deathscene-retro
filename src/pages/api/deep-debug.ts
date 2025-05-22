import type { APIRoute } from "astro"

// A simplified query that should definitely work
const BasicQuery = `
  query {
    shop {
      name
    }
  }
`

// A slightly more complex query without variants
const ProductsWithoutVariantsQuery = `
  query {
    products(first: 5) {
      nodes {
        id
        title
        handle
      }
    }
  }
`

// The full query but with just one product and one variant
const SingleProductWithVariantQuery = `
  query {
    products(first: 1) {
      nodes {
        id
        title
        handle
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  try {
    const domain = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_DOMAIN
    const accessToken = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

    // Test 1: Basic environment check
    const envCheck = {
      domain,
      hasToken: !!accessToken,
      tokenFirstChars: accessToken ? `${accessToken.substring(0, 4)}...` : "none",
      nodeEnv: process.env.NODE_ENV || "unknown",
    }

    // Test 2: Direct fetch with basic query
    let basicResult = null
    let basicError = null
    try {
      const basicResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
        body: JSON.stringify({ query: BasicQuery }),
      })

      const basicResponseText = await basicResponse.text()
      basicResult = {
        status: basicResponse.status,
        ok: basicResponse.ok,
        headers: Object.fromEntries(basicResponse.headers.entries()),
        body: basicResponseText,
        parsedBody: tryParseJson(basicResponseText),
      }
    } catch (e) {
      basicError = e instanceof Error ? e.message : String(e)
    }

    // Test 3: Products without variants
    let productsResult = null
    let productsError = null
    try {
      const productsResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
        body: JSON.stringify({ query: ProductsWithoutVariantsQuery }),
      })

      const productsResponseText = await productsResponse.text()
      productsResult = {
        status: productsResponse.status,
        ok: productsResponse.ok,
        headers: Object.fromEntries(productsResponse.headers.entries()),
        body: productsResponseText.substring(0, 500) + (productsResponseText.length > 500 ? "..." : ""),
        parsedBody: tryParseJson(productsResponseText),
      }
    } catch (e) {
      productsError = e instanceof Error ? e.message : String(e)
    }

    // Test 4: Single product with variant
    let variantResult = null
    let variantError = null
    try {
      const variantResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
        body: JSON.stringify({ query: SingleProductWithVariantQuery }),
      })

      const variantResponseText = await variantResponse.text()
      variantResult = {
        status: variantResponse.status,
        ok: variantResponse.ok,
        headers: Object.fromEntries(variantResponse.headers.entries()),
        body: variantResponseText.substring(0, 500) + (variantResponseText.length > 500 ? "..." : ""),
        parsedBody: tryParseJson(variantResponseText),
      }
    } catch (e) {
      variantError = e instanceof Error ? e.message : String(e)
    }

    return new Response(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          environment: envCheck,
          basicQuery: {
            result: basicResult,
            error: basicError,
          },
          productsQuery: {
            result: productsResult,
            error: productsError,
          },
          variantQuery: {
            result: variantResult,
            error: variantError,
          },
        },
        null,
        2,
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (e) {
    return new Response(
      JSON.stringify(
        {
          error: e instanceof Error ? e.message : String(e),
          stack: e instanceof Error ? e.stack : undefined,
        },
        null,
        2,
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// Helper function to safely parse JSON
function tryParseJson(text: string) {
  try {
    return JSON.parse(text)
  } catch (e) {
    return { parseError: e instanceof Error ? e.message : String(e) }
  }
}
