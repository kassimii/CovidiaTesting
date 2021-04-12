import AWS from 'aws-sdk';

const clientParams = {
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: 'eu-central-1',
};

export const s3 = new AWS.S3(clientParams);
