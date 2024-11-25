import mongoose from "mongoose";
import { getLogger } from "./winston-logger";
import config from "../config/config";


const log = getLogger("dal");

export async function connectToMongo() {

    const url = config.mongoRootUrl!;

    const db = await mongoose.connect(url);

    log.info(`connection to ${db.connections[0].name} on MongoDB. url: ${url}`)


}



