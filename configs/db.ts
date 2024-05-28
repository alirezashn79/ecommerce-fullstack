import mongoose from "mongoose";

export default async function connectToDB() {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(
      "------------------------connected to database------------------------"
    );
  } catch (error) {
    console.log("db connection has been error...!", error);
  }
}
