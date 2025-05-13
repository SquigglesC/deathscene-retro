import { type CodegenConfig } from "@graphql-codegen/cli";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: `.env`, override: true });

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  "missing SHOPIFY_STOREFRONT_ACCESS_TOKEN";

const SHOPIFY_ADMIN_ACCESS_TOKEN =
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ||
  "missing SHOPIFY_ADMIN_ACCESS_TOKEN";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/storefront/": {
      preset: "client",
      documents: ["src/features/**/storefront/*.ts"],
      schema: {
        "https://testingthemes-9552.myshopify.com/api/2025-04/graphql.json": {
          headers: {
            "X-Shopify-Storefront-Access-Token":
              SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
        },
      },
      config: {
        documentMode: "string",
        useTypeImports: true,
      },
    },
    "./src/graphql/admin/": {
      preset: "client",
      documents: ["src/features/**/admin/*.ts"],
      config: {
        documentMode: "string",
        useTypeImports: true,
      },
      schema: {
        "https://testingthemes-9552.myshopify.com/admin/api/2025-04/graphql.json":
          {
            headers: {
              "X-Shopify-Access-Token": SHOPIFY_ADMIN_ACCESS_TOKEN,
            },
          },
      },
    },
  },
};

export default config;