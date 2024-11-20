import mongoose from "mongoose";
import { getLogger } from "./winston-logger";


const url = process.env.MONGO_ROOT_URL || "mongodb://nati:12345@localhost:27017/";

const log = getLogger("dal");

export async function connectToMongo() {

    const db = await mongoose.connect(url);

    log.info(`connection to ${db.connections[0].name} on MongoDB. url: ${url}`)


}



