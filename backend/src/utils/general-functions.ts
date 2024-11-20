import { compare } from "bcryptjs";

// @ts-ignore
export const chackSamePassword = function (el) {
    // @ts-ignore
    return el === this.password;
}


export const correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await compare(candidatePassword, userPassword);

}