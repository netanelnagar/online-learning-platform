import { UploadedFile } from "express-fileupload";
import { getLogger } from "../middlewares/winston-logger";
import { SourceNotFoundError } from "../types/errors-types";
import { IUpdateUser, IUser, userModel } from "../models/student-model";
import path from "path";
import { v4 as uuidv4 } from "uuid";





const log = getLogger("userLogic");



async function getUsers(): Promise<IUser[]> {

    const users = await userModel.find({ role: "user" }).exec();

    const usersArray: IUser[] = users.map(user => user.toObject());

    for (const user of usersArray) {
        delete user.password;
        delete user.salt;
    }

    return usersArray;

}

async function getUser(_id: string): Promise<IUser> {

    const user = await userModel.findById(_id).exec();

    if (!user) { throw new SourceNotFoundError(`id ${_id} not found`); }

    return user;

}


async function updateBestTimeOfMemoryGame(newTime: { _id: string, time: number }): Promise<string> {

    const user = await userModel.findById(newTime._id).exec();

    if (!user) { throw new SourceNotFoundError(`id ${newTime._id} not found`); }

    console.log(user.memoryGame)

    const date = new Date();

    const strDate = date.toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

    const update = { memoryGame: { bestTime: newTime.time, updated: strDate } };

    if (user.memoryGame.bestTime > newTime.time) {

        await userModel.findByIdAndUpdate(newTime._id, update).exec()
        return "best time updated"
    }

    return "best time no updated, it's not a best time"
}

async function updateUser(user: IUpdateUser): Promise<IUpdateUser> {

    const userInDB = await userModel.findById(user._id);

    if (!userInDB) { throw new SourceNotFoundError("user not found "); }

    if (user.username) {
        userInDB.username = user.username;
    }

    if (user.email) {
        userInDB.email = user.email;
    }

    if (user.image) {
        log.info("user uploaded image");

        const ext = path.extname(user.image.name)
        //give uid for image name  
        const imageName = uuidv4() + ext;

        await user.image.mv("./src/1-assets/images/" + imageName);

        delete user.image;

        //fix to correct url
        user.imageName = imageName;

    }

    await userInDB.save()

    return user;

}

async function deleteUser(_id: string) {
    await userModel.findByIdAndDelete(_id);
}


async function toggleBlock(_id: string) {
    const user = await userModel.findById(_id);
    await userModel.findByIdAndUpdate(_id, { blocked: !user?.blocked });
}

export default {
    getUsers,
    getUser,
    updateBestTimeOfMemoryGame,
    updateUser,
    deleteUser,
    toggleBlock
}