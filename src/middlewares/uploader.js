import multer from 'multer';
/* import AWS from 'aws-sdk';
import multerS3 from 'multer-s3'; */

import { AWS_S3_DEMO_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '../config';


/* AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
}); */

//const s3 = new AWS.S3();

// Configures DiscStorage engine
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Configure fileFilter
const fileFilter = (req, file, cb) => {
  if (
    (file.mimetype).includes('jpeg')
    || (file.mimetype).includes('png')
    || (file.mimetype).includes('jpg')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// multer instance
const upload = multer({ 
  storage: storage
});

const uploadMiddleware = {
  upload
}

export default uploadMiddleware;