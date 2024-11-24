import multer from "multer";
import catchAsync from "../utils/catch-async";
import { AppError } from "../utils/app-error";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { join } from "path";
import getVideoDurationInSeconds from "get-video-duration";
import { Readable } from "stream";

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

const uploadUserPhoto = upload.single('photo');
const uploadCourse = upload.array('videos');


const resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    // @ts-ignore
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(join(__dirname, '..', 'uploads', req.file.filename));///here need to keep it in s3 and save the link

    next();
});


const uploadCourseVideo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.files) return next();

    req.body.lessons = [];

    // @ts-ignore
    for (const file of req.files) {
        const stream = bufferToStream(file.buffer);
        const duration = await getVideoDurationInSeconds(stream);
        // @ts-ignore
        const filename = `course-${req.user.id}-${Date.now()}.mp4`;
        // HERE NEED TO KEEP IN S3 and save the link

        req.body.lessons.push({
            title: "file.originalname",
            videoUrl: file.originalname,
            duration: Number(duration.toFixed(2))
        });
    }

    next();
});





export default {
    uploadUserPhoto,
    uploadCourse,
    resizeUserPhoto,
    uploadCourseVideo
}

