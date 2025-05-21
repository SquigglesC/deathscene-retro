import { execute } from "../../graphql/execute";

const StorefrontTestQuery = `
  query {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await execute(StorefrontTestQuery as any, []);
    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("❌ execute() failed:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
