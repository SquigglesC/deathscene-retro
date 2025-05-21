import { executeAdminUntyped } from "../../graphql/execute";

const query = `
  query {
    products(first: 5) {
      nodes {
        id
        title
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await executeAdminUntyped(query, {});
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
