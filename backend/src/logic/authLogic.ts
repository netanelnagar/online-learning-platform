import path from "path";
import auth from "../utils/auth";
import { getLogger } from "../middlewares/winston-logger";
import { SourceNotFoundError, ValidationError } from "../types/errors-types";
import { IUser, userModel } from "../models/student-model";
import { v4 as uuidv4 } from "uuid";
import { compareSync } from "bcryptjs";
// import Randomstring from "randomstring";


const log = getLogger("authLogic");

async function register(user: IUser) {

    user.memoryGame = { bestTime: Number.MAX_VALUE };

    user.role = "user";

    user.blocked = false;

    if (user.image) {
        log.info("user uploaded image");

        const ext = path.extname(user.image.name)
        //give uid for image name  
        const imageName = uuidv4() + ext;

        await user.image.mv("./src/1-assets/images/" + imageName);

        delete user.image;

        //fix to correct url
        user.imageName = imageName;
    };

    if (!user.password) { throw new ValidationError("Please enter password") };

    const [password, salt] = await auth.getPasswordAfterHashAndSalt(user.password);

    user.salt = salt;

    user.password = password;

    const doc = new userModel(user);

    const err = doc.validateSync();

    if (err) { throw new ValidationError(err.message); }

    const u = await doc.save();

    log.info("Successfully registered user " + user.username);

    const token = auth.getNewToken(user);

    delete user.role;

    user._id = u._id;

    return { user, token };
}


async function login(user: { username: string, password: string }): Promise<{ user: IUser, token?: string }> {

    const userInDB = await userModel.findOne({ username: user.username }).exec();

    if (!userInDB || !user.password) throw new SourceNotFoundError("is not a valid user");

    if (userInDB) {
        const isEqual = compareSync(user.password, userInDB.password as string);

        if (!isEqual) throw new SourceNotFoundError("is not a valid user");
    }


    const userWithToken: { user: IUser, token?: string } = { user: userInDB };

    userWithToken.token = auth.getNewToken(userInDB);

    log.info("Successfully logged user " + user.username);

    userWithToken.user.password = undefined;

    userWithToken.user.salt = undefined;

    userWithToken.user.role = undefined;

    return userWithToken;
}




export default {
    register,
    login,

}