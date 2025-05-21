import { executeAdmin } from "../../graphql/execute";

// Replace this with a real product ID from your store
const TEST_PRODUCT_ID = "gid://shopify/Product/8659578749077";

// You can use a typed query or a raw string here
const query = `
  query getProductMetafields($id: ID!) {
    product(id: $id) {
      id
      title
      metafields(keys: ["custom.release_date"], first: 5) {
        nodes {
          key
          value
          type
          namespace
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await executeAdmin(
      query as any,
      { id: TEST_PRODUCT_ID }
    );

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: any) {
    console.error("❌ executeAdmin() failed:", e.message || e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
