import express from 'express'; // Importing the express framework to create the server and manage routes
import dotenv from 'dotenv'; // Importing the dotenv package to load environment variables from a .env file
import cookieParser from 'cookie-parser';
import { connectDB } from './Db/connectDB.js'; // Importing the connectDB function to establish a connection to the database

import authRoutes from './routes/auth.route.js'; // Importing authentication-related routes from the auth.route.js file

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an instance of an express application allowing us to parse incoming request:req.body
const PORT = process.env.PORT || 5000; // Define the server port from environment variables, or use port 5000 by default

app.use(express.json()); // Middleware to parse incoming JSON requests and put the parsed data in req.body
app.use(cookieParser()); //Allows us to parse incoming cookies
app.use("/api/auth", authRoutes); // Use the auth routes, which handle authentication, and prefix them with "/api/auth"
// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    connectDB(); // Call the connectDB function to connect to the database when the server starts
    console.log("Server is running on port: ", PORT); // Log a message to the console to indicate the server is running
});
