import { Request } from "express";
import { IUser } from "../models/student-model";
import jwt from "jsonwebtoken";
import { genSalt, hashSync } from "bcryptjs";


const secretKey = 'secretKeyForWebsiteOfNatiNagarInAuth.ts';

function getNewToken(user: IUser): string {

    delete user.password;

    delete user.salt;

    const container = { user };

    const options = { expiresIn: '3h' };

    const token = jwt.sign(container, secretKey, options);

    return token;
}


function verifyLogged(req: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const header = req.header('Authorization');
            if (!header) resolve(false);

            const token = header?.substring(7);
            if (!token) resolve(false);

            jwt.verify(token as string, secretKey, (error) => {
                if (error) resolve(false);
            })

            resolve(true);
        } catch (error) {
            reject(error)
        }
    })
}

async function verifyAdmin(req: Request): Promise<boolean> {
    try {
        const isValid = await verifyLogged(req);
        if (!isValid) return false;

        const header = req.header('Authorization');
        if (!header) return false;

        const token = header.substring(7)
        if (!token) return false;

        const container: any = jwt.decode(token)

        const user = container.user;

        return user.role === 'admin';
    } catch (error) {
        return false;
    }
}

async function getPasswordAfterHashAndSalt(password: string): Promise<string[]> {

    const salt = await genSalt(10);
    const hash = hashSync(password, salt);
    return [hash, salt];

}



export default {
    getNewToken,
    verifyLogged,
    verifyAdmin,
    getPasswordAfterHashAndSalt,
}