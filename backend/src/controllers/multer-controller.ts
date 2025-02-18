import multer from "multer";
import catchAsync from "../utils/catch-async";
import { AppError } from "../utils/app-error";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import getVideoDurationInSeconds from "get-video-duration";
import { PassThrough, Readable } from "stream";
import aws from "../utils/aws";
import { sendRes } from "../utils/general-functions";
import { Courses } from "../models/course-model";
// import Ffmpeg from "fluent-ffmpeg";
import { getLogger } from "../utils/winston-logger";
import { ILesson } from "../types/course-types";
// import ffmpegPath from "ffmpeg-static";

// Ffmpeg.setFfmpegPath(ffmpegPath!);
const log = getLogger("multer")


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


const courseFiles = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videos' },
]);


const resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    // @ts-ignore
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;


    req.file.buffer = await resizePhoto(req.file.buffer);

    await aws.uploadToS3(req.file);

    req.body.imageName = req.file.filename;

    log.info("uploaded image to s3");

    next();
});

// const resizeCourseVideo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     if (req.files
//         && typeof req.files === 'object'
//         && 'videos' in req.files
//     ) {

//         for (const file of req.files.videos) {
//             const bufferStream = new PassThrough();
//             bufferStream.end(file.buffer);
//             const outputStream = new PassThrough();

//             outputStream.on('data', (chunk) => {
//                 let outputBuffer = Buffer.alloc(0);
//                 file.buffer = Buffer.concat([outputBuffer, chunk]);
//             });
//             await Ffmpeg(bufferStream)
//                 .outputOptions('-vf', 'scale=280:720') // Example: Resize to 1280x720
//                 .toFormat('mp4')
//                 .pipe(outputStream, { end: true });
//         }
//     }

//     next();
// });


const uploadCourseVideo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (req.files
        && typeof req.files === 'object'
        && 'videos' in req.files
    ) {

        const lessons: ILesson[] = [];

        for (const [index, file] of req.files.videos.entries()) {
            const stream = bufferToStream(file.buffer);
            const duration = await getVideoDurationInSeconds(stream);
            // @ts-ignore
            file.filename = `lessons-${req.user.id}-${Date.now()}.mp4`;

            await aws.uploadToS3(file);

            lessons.push({
                title: (typeof req.body?.titles === "string" ? req.body?.titles : req.body?.titles?.[index]) || "Lesson",
                videoName: file.filename,
                duration: Number(duration.toFixed(2))
            });

            log.info("uploaded video to s3");
        }


        // @ts-ignore
        req.doc = (await Courses.findOneAndUpdate(
            // @ts-ignore
            { _id: req.doc._id },
            { $push: { lessons: { $each: lessons } } },
            { new: true }
        ).setOptions({ isCreateCourse: true }))?.toObject();
    } else {
        throw new AppError('No videos provided.', 400);
    }

    // @ts-ignore
    sendRes(res, 201, "succuss", req.doc);
});

const uploadCoursePhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (req.files
        && typeof req.files === 'object'
        && 'thumbnail' in req.files
        && req.files.thumbnail.length
    ) {

        const thumbnailFile = req.files['thumbnail'][0];

        // @ts-ignore
        thumbnailFile.filename = `thumbnail-${req.user.id}-${Date.now()}.jpeg`;

        thumbnailFile.buffer = await resizePhoto(thumbnailFile.buffer);

        await aws.uploadToS3(thumbnailFile);


        log.info("uploaded thumbnail to s3");

        req.body.doc = (await Courses.findOneAndUpdate(
            // @ts-ignore
            { _id: req.user.id },
            { thumbnail: thumbnailFile.filename },
            { new: true }
        ))?.toObject();
    } else {
        throw new AppError('No thumbnail provided.', 400);
    }

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
    uploadCourseVideo,
    resizeUserPhoto,
    // resizeCourseVideo,
    userPhoto,
    courseFiles,
}

