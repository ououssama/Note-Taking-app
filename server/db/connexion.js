// import { MongoClient } from 'mongodb';
// require('dotenv').config();
import mongoose from 'mongoose';

const CONNECTION_URI = process.env.MONGODB_URI || ''
mongoose.set("strictQuery", false);

try {
    await mongoose.connect(CONNECTION_URI)
} catch(e) {
    console.log(e);
}