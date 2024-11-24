import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { getLogger } from "../utils/winston-logger";
import { AppError } from "../utils/app-error";

const log = getLogger("factory")

const getAll = (model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = await model.find();

    res.status(200).json({
        status: "success",
        data
    })
})



const createOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = new Model(req.body) as Document;
    const err = doc.validateSync();

    if (!err) {
        await doc.save();
        log.info(`create doc in ${Model.modelName} collection`)
    } else {
        throw new AppError(err.message, 400)
    }

    res.status(201).json({
        status: "success",
        data: doc
    })
})

const updateOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }
    res.status(200).json({
        status: 'success',
        data: doc

    });
})

const deleteOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (doc === null) throw new AppError('No document found with that ID', 404);

    res.status(204).json({ status: 'success', data: null });
})

const getOne = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
})

const deleteMe = (Model: Model<any>) => catchAsync(async (req, res, next) => {
    //@ts-ignore
    await Model.findByIdAndUpdate(req.user?.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});
const updateMe = (Model: Model<any>) => catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        throw new AppError('This route is not for password updates. Please use /updateMyPassword.', 400)
    }

    if (req.file) req.body.profilePicture = req.file.filename;

    //@ts-ignore
    const doc = await Model.findByIdAndUpdate(req.user?.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: doc
    });
});


export default {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOne,
    deleteMe,
    updateMe
}