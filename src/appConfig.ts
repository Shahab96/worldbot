export interface Server {
  server: "EN" | "FR" | "ES" | "PT" | "Test";
  id: string;
  channel: string;
}

export interface AppConfig {
  servers: Server[];
}

export const getAppConfig = async (): Promise<AppConfig> => {
  
};
