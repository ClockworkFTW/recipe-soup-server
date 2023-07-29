import aws from "aws-sdk";
import variables from "./variables.js";

aws.config.update({
  secretAccessKey: variables.aws.secretAccessKey,
  accessKeyId: variables.aws.accessKeyId,
});

export const s3 = new aws.S3({ region: variables.aws.region });
