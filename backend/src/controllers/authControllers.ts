import { NextFunction, Request, Response, Router } from "express";
import authLogic from "../logic/authLogic";

const router = Router();

router.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.body;
        user.image = req.files?.image;
        const token = await authLogic.register(user);
        res.status(201).send(token);

    } catch (error: any) {
        let err = { code: 400, message: error.errmsg };
        if (error.errmsg) {
            next(err);
        } else {
            next(error);
        }
    }
})

router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.body;
        const userAndToken = await authLogic.login(user);
        res.status(201).send(userAndToken);

    } catch (error: any) {
        next(error);
    }
})





export default router;