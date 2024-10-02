import express from 'express';// Importing express to create routes and manage HTTP requests
// Importing the authentication-related controller functions (signup, login, logout) from the auth.controller.js file
import { login, logout, signup } from '../controllers/auth.controller.js';
// Create an express router instance to define route handlers
const router = express.Router();
// Define a GET route for user signup, which calls the signup function from the controller
router.get("/signup", signup);
// Define a GET route for user login, which calls the login function from the controller
router.get("/login", login);
// Define a GET route for user logout, which calls the logout function from the controller
router.get("/logout", logout);
// Export the router so it can be used in other parts of the application (e.g., in the main app file)
export default router;
