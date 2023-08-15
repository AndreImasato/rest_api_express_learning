import fs from 'fs';
import AWS from 'aws-sdk';

import { AWS_S3_DEMO_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_HOST_ENDPOINT } from '../config';


const AWSConfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  s3ForcePathStyle: true,
}

if (AWS_HOST_ENDPOINT){
  AWSConfig['endpoint'] = AWS_HOST_ENDPOINT;
}

AWS.config.update(AWSConfig);

const s3 = new AWS.S3();

const uploadFile = async (source, targetName) => {
  // Read file
  fs.readFile(source, (err, fileData) => {
    if (err){
      throw new Error(err);
    }

    // Prepares upload parameters for S3 Bucket
    const putParams = {
      Bucket: AWS_S3_DEMO_BUCKET,
      Key: targetName,
      Body: fileData
    };

    // Pubs object in S3 Bucket
    s3.putObject(
      putParams,
      (err, data) => {
        if (err){
          throw new Error(err);
        }
        // Deletes generated file
        fs.unlinkSync(source)
        return targetName;
      }
    );
  })
}

export default uploadFile;