import { execute } from "../../graphql/execute";
import { AllProductsQuery } from "../../features/shop/storefront/getAllProducts";

export async function GET() {
  try {
    const data = await execute(AllProductsQuery);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    console.error("❌ execute() failed:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
