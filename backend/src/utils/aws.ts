import { DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from '../config/config';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ILesson } from "../types/course-types";

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.awsAccessKey!,
        secretAccessKey: config.awsSecretAccessKey!,
    },
    region: config.awsRegion!,
})


const uploadToS3 = async function (file: Express.Multer.File): Promise<void> {

    const command = new PutObjectCommand({
        Bucket: config.awsS3BucketName!,
        Key: file.filename,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3.send(command)
}

const getImageUrl = async function (filename: string): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: config.awsS3BucketName!,
        Key: filename,
    });

    return await getSignedUrl(s3, command, { expiresIn: (60 * 60 * 24) });
}


const deleteFileFromS3 = async function (filename: string): Promise<void> {
    const command = new DeleteObjectCommand({
        Bucket: config.awsS3BucketName!,
        Key: filename,
    });
    await s3.send(command);
}

const deleteFilesFromS3 = async function (lessons: ILesson[]): Promise<void> {
    const command = new DeleteObjectsCommand({
        Bucket: config.awsS3BucketName!,
        Delete: { Objects: lessons.map(lesson => ({ Key: lesson.videoUrl })) },
    });
    await s3.send(command);
}


export default {
    uploadToS3,
    getImageUrl,
    deleteFileFromS3,
    deleteFilesFromS3
}