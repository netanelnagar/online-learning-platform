import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { getLogger } from "../utils/winston-logger";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import aws from "../utils/aws";


const log = getLogger("factory")

const getAll = (model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const query = model.find();
    if (model.modelName === "Courses") {
        query.setOptions({ withUrlMedia: true })
    }
    const data = await query;

    sendRes(res, 200, "success", data);
})



const createOne = (Model: Model<any>, isLastMiddleware = true) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = new Model(req.body) as Document;
    const err = doc.validateSync();

    if (err) throw new AppError(err.message, 400);

    await doc.save();

    log.info(`create doc in ${Model.modelName} collection`);

    if (isLastMiddleware) {
        return sendRes(res, 201, "success", doc)
    } else {
        req.body = doc.toObject();
        next();
    }

})

const updateOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    log.info(`Updated doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 200, "success", doc);

})

const deleteOne = (Model: Model<any>, isLastMiddleware = true) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (doc === null) throw new AppError('No document found with that ID', 404);

    log.info(`Deleted doc in ${Model.modelName} ID: ${doc._id} collection`);

    if (isLastMiddleware) {
        return sendRes(res, 204, "success", null);
    } else {
        req.body = doc.toObject();
        next();
    }

})

const getOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    sendRes(res, 200, "success", doc);

})

const deleteMe = (Model: Model<any>) => catchAsync(async (req, res, next) => {
    //@ts-ignore
    const doc = await Model.findByIdAndUpdate(req.user?.id, { active: false, imageName: undefined });

    if (doc.imageName) await aws.deleteFileFromS3(doc.imageName);

    log.info(`Deleted doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 204, "success", null);

});
const updateMe = (Model: Model<any>) => catchAsync(async (req, res, next) => {


    if (req.file) req.body.profilePicture = req.file.filename;

    //@ts-ignore
    const doc = await Model.findByIdAndUpdate(req.user?.id, req.body, { new: true, runValidators: true });

    log.info(`Updated doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 200, "success", doc);

});

const validate = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (username || email) throw new AppError("Can't update username or email.", 400);
    if (password || passwordConfirm)
        throw new AppError('This route is not for password updates. Please use /updateMyPassword.', 400);
    next();
});

const me = (Model: Model<any>) => catchAsync(async (req, res, next) => {
    // @ts-ignore
    const doc = await Model.findById(req.user?.id).setOptions({ withUrlMedia: true });
    sendRes(res, 200, "success", doc);
});

export default {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOne,
    deleteMe,
    updateMe,
    validate,
    me
}  