import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is missing");
}

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Reusing existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Establishing new database connection...");
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "imaginify", // Ensure the database name is correct
        bufferCommands: false,
      })
      .then((connection) => {
        console.log("Database connected successfully");
        return connection;
      })
      .catch((error) => {
        console.error("Database connection failed:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
