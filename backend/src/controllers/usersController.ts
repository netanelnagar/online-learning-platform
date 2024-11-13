import { NextFunction, Request, Response, Router } from "express";
import userLogic from "../logic/userLogic";
import { verifyAdmin, verifyLogged } from "../middlewares/verifyLogged";
import { getLogger } from "../middlewares/winston-logger";
import { IUpdateUser } from "../models/student-model";

export const router = Router();

const log = getLogger("usersControllers");

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userLogic.getUsers();
        console.log(users)
        log.info("get all users")
        res.json(users);
    } catch (error) {
        next(error);
    }
})

router.get('/users/:_id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params._id;
        const user = await userLogic.getUser(_id);
        log.info("get user with id: " + _id);
        res.json(user);
    } catch (error) {
        next(error);
    }
})

router.post('/users/memory-game/:_id', verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestTime = req.body;
        bestTime._id = req.params._id;
        const message = await userLogic.updateBestTimeOfMemoryGame(bestTime);
        log.info(message);
        res.json(message);
    } catch (error) {
        next(error);
    }
});


router.patch('/users/update', verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user: IUpdateUser = req.body;
        const obj = await userLogic.updateUser(user);
        res.status(201).json(obj);

    } catch (error: any) {
        next(error);
    }
})

router.patch('/users/toggle-block/:id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const _id = req.params.id;
        await userLogic.toggleBlock(_id);
        res.status(201);

    } catch (error: any) {
        next(error);
    }
})




router.delete('/users/:id', verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const _id = req.params.id;
        await userLogic.deleteUser(_id);
        res.status(200);

    } catch (error: any) {
        next(error);
    }
})
export default router;