declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ABLY_REALTIME_KEY: string;
      NEXT_PUBLIC_ABLY_REALTIME_KEY: string;
      PSQL_KEY: string;
    }
  }
}

export {};
