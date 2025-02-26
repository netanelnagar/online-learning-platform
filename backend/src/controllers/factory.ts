import { NextFunction, Response } from "express";
import { Document, Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { getLogger } from "../utils/winston-logger";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import {  deleteFileFromS3 } from "../utils/aws";
import { CustomRequest } from "../types/express";


const log = getLogger("factory")

export const getAll = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const query = Model.modelName === "Teachers" ? Model.find().setOptions({ forHomePage: true }) : Model.find();

    const data = await query;

    sendRes(res, 200, "success", data);
})



export const createOne = (Model: Model<any>, isLastMiddleware = true) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let doc = new Model(req.body) as Document;

    const err = doc.validateSync();

    if (err) throw new AppError(err.message, 400);

    doc = await doc.save();

    log.info(`create doc in ${Model.modelName} collection`);

    if (isLastMiddleware) {
        return sendRes(res, 201, "success", doc)
    } else {
        req.doc = doc;
        next();
    }

})

export const updateOne = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).setOptions({ overridePublishedFilter: true });

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    log.info(`Updated doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 200, "success", doc);

})

export const deleteOne = (Model: Model<any>, isLastMiddleware = true) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

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

export const getOne = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    sendRes(res, 200, "success", doc);

})

export const deleteMe = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.user?.id, { active: false, imageName: undefined });

    if (doc.imageName) await deleteFileFromS3(doc.imageName);

    log.info(`Deleted doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 204, "success", null);

});
export const updateMe = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    if (req.file) req.body.imageName = req.file.filename;

    const doc = Model.modelName === "Teachers" ?
        await Model.findByIdAndUpdate(req.user?.id, { ...req.body, "socialLinks.linkedin": req.body.linkedIn, "socialLinks.github": req.body.github, "socialLinks.website": req.body.website }, { new: true, runValidators: true }).setOptions({ withUrlMedia: true })
        :
        await Model.findByIdAndUpdate(req.user?.id, req.body, { new: true, runValidators: true }).setOptions({ withUrlMedia: true });

    log.info(`Updated doc in ${Model.modelName} ID: ${doc._id} collection`);

    sendRes(res, 200, "success", doc);

});

export const validate = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { email, password, passwordConfirm } = req.body;
    if (email) throw new AppError("Can't update email.", 400);
    if (password || passwordConfirm)
        throw new AppError('This route is not for password updates. Please use /updateMyPassword.', 400);
    next();
});

export const me = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.user?.id).setOptions({ withUrlMedia: true });
    sendRes(res, 200, "success", doc);
});

