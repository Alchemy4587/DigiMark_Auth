import mongoose from "mongoose"; // Importing mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js
// Exporting an asynchronous function named connectDB to establish a MongoDB connection
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Attempt to connect to the MongoDB database using the URI from environment variables
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log a success message, including the host of the MongoDB connection
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message); // Log an error message if the connection fails, along with the error details

        process.exit(1); // Exit the process with a status code of 1, indicating failure (0 indicates success)
    }
}
