import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to Database...");
  } catch (error) {
    console.log("Error connecting to database...");
  }
}

export default connectToDB;
  