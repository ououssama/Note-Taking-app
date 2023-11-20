import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const noteSchema = new Schema({
    title: "string",
    content: "string"
})

export const Note = mongoose.model("Note", noteSchema)