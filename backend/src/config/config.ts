import { config } from "dotenv";
config({ path: ".env" });

export default {
    mongoRootUsername: process.env.MONGO_ROOT_USERNAME,
    mongoRootPassword: process.env.MONGO_ROOT_PASSWORD,
    mongoRootUrl: process.env.MONGO_ROOT_URL,
    mode: process.env.MODE,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    adminPassword: process.env.ADMIN_PASSWORD,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    awsRegion: process.env.AWS_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

