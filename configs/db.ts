import mongoose from "mongoose";

export default async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(
      "------------------------connected to database------------------------"
    );
  } catch (error) {
    console.log("db connection has been error...!", error);
  }
}
