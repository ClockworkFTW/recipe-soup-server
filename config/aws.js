import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import variables from "./variables.js";

const { secretAccessKey, accessKeyId, region, bucket } = variables.aws;

const client = new S3Client({
  secretAccessKey,
  accessKeyId,
  region,
});

export async function uploadFile({ body, key }) {
  const input = {
    Bucket: bucket,
    Body: body,
    Key: key,
  };

  const command = new PutObjectCommand(input);

  await client.send(command);

  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  return { bucket, key, url };
}

export async function deleteFile({ bucket, key }) {
  const input = {
    Bucket: bucket,
    Key: key,
  };

  const command = new DeleteObjectCommand(input);

  await client.send(command);
}
