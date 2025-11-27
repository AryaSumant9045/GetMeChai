import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Chai"

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection
        }

        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("MongoDB connected")
        return conn
    } catch (error) {
        console.error("MongoDB connection error:", error.message)
        throw error
    }
}

export default connectDB