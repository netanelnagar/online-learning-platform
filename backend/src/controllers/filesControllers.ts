import { NextFunction, Request, Response, Router } from "express";
import { existsSync } from "fs";
import path from "path";
import { SourceNotFoundError } from "../types/errors-types";
import { log } from "console";

const routerFiles = Router();

routerFiles.get('/images/:imageName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageName = req.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-asset", "images", imageName);
        log(absolutePath);
        if (!existsSync(absolutePath)) throw new SourceNotFoundError(`Image ${imageName} not found`);

        res.sendFile(absolutePath)
    } catch (error) {
        next(error);
    }
});

export default routerFiles;