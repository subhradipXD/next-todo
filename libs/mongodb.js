import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("connected");

    } catch (error) {
        console.log(error);

    }
}

export default connectMongoDB;