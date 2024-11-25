import multer from "multer";
import catchAsync from "../utils/catch-async";
import { AppError } from "../utils/app-error";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { join } from "path";
import getVideoDurationInSeconds from "get-video-duration";
import { Readable } from "stream";
import aws from "../utils/aws";
import config from "../config/config";
import { sendRes } from "../utils/general-functions";

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });


const bufferToStream = (buffer: Buffer): Readable => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Indicate the end of the stream
    return stream;
};




const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400));
    }
};


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const userPhoto = upload.single('photo');
const coursePhoto = upload.single('thumbnail')
const courseVideos = upload.array("videos");


const resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    // @ts-ignore
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;


    req.file.buffer = await resizePhoto(req.file.buffer);
    ///here need to keep it in s3 and save the link

    await aws.uploadToS3(req.file);

    req.body.profilePicture = req.file.filename;

    next();
});


const uploadCourseVideo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.files) return sendRes(res, 201, "sucssus", req.body.user);

    req.body.lessons = [];


    // @ts-ignore
    for (const file of req.files?.videos) {
        const stream = bufferToStream(file.buffer);
        const duration = await getVideoDurationInSeconds(stream);
        // @ts-ignore
        file.filename = `course-${req.user.id}-${Date.now()}.mp4`;
        // HERE NEED TO resize and keep IN S3 and save the link

        await aws.uploadToS3(file);

        req.body.lessons.push({
            title: file.originalname,
            videoUrl: file.filename,
            duration: Number(duration.toFixed(2))
        });
    }

    // add findOneAndUpdate method
    next();
});

const uploadCoursePhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.file) return next();

    // @ts-ignore
    req.file.filename = `course-${req.user.id}-${Date.now()}.jpeg`;

    req.file.buffer = await resizePhoto(req.file.buffer);

    await aws.uploadToS3(req.file);

    req.body.thumbnail = req.file.filename;

    next();
});


const resizePhoto = async function (photo: Buffer): Promise<Buffer> {
    return await sharp(photo)
        .resize({ height: 500, width: 500, fit: "contain" })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();
}




export default {
    uploadCoursePhoto,
    resizeUserPhoto,
    uploadCourseVideo,
    userPhoto,
    coursePhoto,
    courseVideos
}

