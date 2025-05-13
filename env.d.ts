interface ImportMetaEnv {
    readonly PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
    readonly PUBLIC_SHOPIFY_STOREFRONT_DOMAIN: string;
    readonly SHOPIFY_ADMIN_ACCESS_TOKEN: string;
  }
  
  interface ImportMeta {
    env: ImportMetaEnv;
  }