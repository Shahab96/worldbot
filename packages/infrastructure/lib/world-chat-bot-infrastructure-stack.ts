import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

export class WorldChatBotInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "AppConfigBucket", {
      bucketName: "world-chat-bot-config",
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
    });
  }
}
