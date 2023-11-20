// import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import '../loadEnv.js'

const CONNECTION_URI = process.env.MONGODB_URI || ''
mongoose.set("strictQuery", false);

try {
    await mongoose.connect(CONNECTION_URI)
} catch(e) {
    console.log(e);
}