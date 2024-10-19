declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      API_URL: string;
      LISTEN_PATH: string;
      WEBHOOK_DOMAIN: string;
      WEBHOOK_PORT: number;
      WEBHOOK_PATH: string;
      WEBHOOK_SECRET: string;
      WEBHOOK_CERT: string;
    }
  }
}

export {};
