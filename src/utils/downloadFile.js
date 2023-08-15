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

const downloadFile = async (filename) => {
  const getParams = {
    Bucket: AWS_S3_DEMO_BUCKET,
    Key: filename
  };

  s3.getObject(
    getParams,
    (err, data) => {
      if (err){
        throw new Error(err);
      }

      return data.Body;
    }
  )
}

export default downloadFile;