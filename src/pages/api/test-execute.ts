import { execute } from "../../graphql/execute";
import { AllProductsQuery } from "../../features/shop/storefront/getAllProducts";

export async function GET() {
  try {
    const data = await execute(AllProductsQuery);
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

