import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const noteSchema = new Schema({
    uid: {
        type: 'string',
        index: true,
    },
    title: "string",
    content: "string",
    colorId: "Number"
})

// noteSchema.index({ id: 1 });
export const Note = mongoose.model("Note", noteSchema)