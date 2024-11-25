import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { getLogger } from "../utils/winston-logger";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";

const log = getLogger("factory")

const getAll = (model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = await model.find();

    sendRes(res, 200, "success", data);
})



const createOne = (Model: Model<any>, isLastMiddleware = true) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = new Model(req.body) as Document;
    const err = doc.validateSync();

    if (!err) {
        await doc.save();
        log.info(`create doc in ${Model.modelName} collection`)
    } else {
        throw new AppError(err.message, 400)
    }

    if (isLastMiddleware) {
        return sendRes(res, 201, "success", doc)
    } else {
        req.body.user = doc;
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
    sendRes(res, 200, "success", doc);

})

const deleteOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (doc === null) throw new AppError('No document found with that ID', 404);

    sendRes(res, 204, "success", null);

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
    await Model.findByIdAndUpdate(req.user?.id, { active: false });

    sendRes(res, 204, "success", null);

});
const updateMe = (Model: Model<any>) => catchAsync(async (req, res, next) => {


    if (req.file) req.body.profilePicture = req.file.filename;

    //@ts-ignore
    const doc = await Model.findByIdAndUpdate(req.user?.id, req.body, { new: true, runValidators: true });

    sendRes(res, 200, "success", doc);

});

const validate = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body;
    if (username || email) throw new AppError("Can't update username or email.", 400);
    if (password || passwordConfirm)
        throw new AppError('This route is not for password updates. Please use /updateMyPassword.', 400)

});

export default {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOne,
    deleteMe,
    updateMe,
    validate
}