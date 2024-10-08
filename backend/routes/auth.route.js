import express from 'express';// Importing express to create routes and manage HTTP requests
import { 
    checkAuth,
    forgotPassword, 
    login, 
    logout, 
    resetPassword, 
    signup, 
    verifyEmail 
} from '../controllers/auth.controller.js'; // Importing the authentication-related controller functions (signup, login, logout) from the auth.controller.js file
import { verifyToken } from '../middleware/verifyToken.js';
// Create an express router instance to define route handlers
const router = express.Router();


router.get("/check-auth", verifyToken, checkAuth);
router.post ("/signup", signup); // Define a GET route for user signup, which calls the signup function from the controller
router.post ("/login", login);// Define a GET route for user login, which calls the login function from the controller
router.post ("/logout", logout);// Define a GET route for user logout, which calls the logout function from the controller

router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",resetPassword);
export default router;// Export the router so it can be used in other parts of the application (e.g., in the main app file)
