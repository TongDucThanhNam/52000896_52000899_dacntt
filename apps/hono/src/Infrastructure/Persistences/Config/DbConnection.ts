import {MongoClient} from "mongodb";

require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const dbName = process.env.DATABASE_NAME;


async function connectDB() {
    if (!URI) {
        throw new Error("Connection string is not provided !");
    }

    const client = new MongoClient(URI, {
        connectTimeoutMS: 30000,

    });
    await client.connect();
    console.log("Connected successfully to database !");
    return client.db(dbName);
}

export {
    connectDB,
}