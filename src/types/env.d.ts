declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AZURE_AD_CLIENT_ID: string;
      AZURE_AD_CLIENT_SECRET: string;
      AZURE_AD_TENANT_ID: string;
      NEXTAUTH_SECRET: string;
      BASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      PG_USERNAME: string;
      PG_PASSWORD: string;
      DB_NAME: string;
    }
  }
}

export {}
