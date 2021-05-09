const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const regionn = process.env.AWS_BUCKET_REGION;
const accesssKeyId = process.env.AWS_ACCESS_KEY;
const secretAccesssKey = process.env.AWS_SECRET_KEY;
const token = process.env.AWS_SESSION_TOKEN;

aws.config.update({
  secretAccessKey: secretAccesssKey,
  accessKeyId:accesssKeyId,
  sessionToken: token,
  region: regionn
});
 
const s3 = new aws.S3(
  {
    accessKeyId: accesssKeyId,
    secretAccessKey: secretAccesssKey,
    sessionToken: token,
    Bucket: bucketName
  }
);
 
const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now().toString() + path.extname(file.originalname))
    }
  }),
  limits:{fileSize: 10000000}
}).single('image');

module.exports = fileUpload;