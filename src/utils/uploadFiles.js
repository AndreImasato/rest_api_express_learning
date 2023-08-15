import fs from 'fs';
import AWS from 'aws-sdk';

import { AWS_S3_DEMO_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '../config';


AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

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
      putParams
    )
      .then((data) => {
        // Deletes generated file
        fs.unlink(source)
        return targetName;
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      })
  })
}

export default uploadFile;