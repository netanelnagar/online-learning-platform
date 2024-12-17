import mongoose from "mongoose";
import { getLogger } from "./winston-logger";


const log = getLogger("dal");

export async function connectToMongo() {

    const url = process.env.MONGO_ROOT_URL!;

    const db = await mongoose.connect(url);

    log.info(`connection to ${db.connections[0].name} on MongoDB. url: ${url}`)


}



