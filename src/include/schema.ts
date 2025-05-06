import * as mongoose from 'mongoose';

const short = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    dest: { type: String, required: true }
})

export type Short = mongoose.InferSchemaType<typeof short>;
export const Short = mongoose.model('Short', short);