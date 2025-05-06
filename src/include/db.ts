import * as mongoose from 'mongoose';
import * as crypto from "node:crypto";
import { Short } from './schema';
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "dotenv";

const env = parse(readFileSync(resolve(process.cwd(), ".env")));

let connectionString = env.MONGODB_CONNSTR;
if (!connectionString) {
    throw Error('MongoDB connection string is null');
}

await mongoose.connect(connectionString);

export async function getLongUrl(id: string) {
    const url = await Short.findById(id);
    if (!url || !url?.dest) {
        return null;
    }
    return url.dest;
}

export async function setShortUrl(long: string, id?: string) {
    if (!id) id = crypto.randomBytes(4).toString('hex');
    const short = new Short({
        _id: id,
        dest: long
    })
    await short.save();
    return id;
}