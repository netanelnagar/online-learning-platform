import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { getLogger } from "../middlewares/winston-logger";
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


export default {
    getAll,
    createOne,
    updateOne
}