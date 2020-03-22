import { S3 } from "aws-sdk";

export interface Server {
  server: "EN" | "FR" | "ES" | "PT" | "Test";
  id: string;
  channel: string;
}

export interface AppConfig {
  servers: Server[];
}

export const getAppConfig = async (): Promise<AppConfig> => {
  const s3 = new S3();
  const response = await s3.getObject({
    Bucket: "world-chat-bot-config",
    Key: "appConfig.json",
  }).promise();

  const appConfig = JSON.parse(response.Body?.toString()!);
  return appConfig;
};
