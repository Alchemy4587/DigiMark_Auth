import { User } from "../model/user.model.js"; // Import the User model to interact with the users collection in the database
// Import bcryptjs, a library used to hash passwords
import bcryptjs from 'bcryptjs';
// Export the signup function to handle user registration
export const signup = async (req, res) => {
    const { email, password, name } = req.body; // Extract email, password, and name from the incoming request body
    try {
        if (!email || !password || name) { // Check if any required field is missing, and throw an error if so
            throw new Error("All fields are required");
        }    
        const userAlreadyExist = await User.findOne({ email }); // Check if a user with the provided email already exists in the database        
        
        if (userAlreadyExist) { // If the user already exists, return a 400 status and an error message
            return res.status(400).json({ success: false, message: "User Already Exist" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);// Hash the password using bcryptjs with a salt round of 10 for security
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();// Generate a 6-digit verification token for account verification

        const user = new User({ // Create a new User instance with the email, hashed password, name, and verification token
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // Set the token expiration time to 24 hours from the current time
        });

        await user.save(); // Save the new user to the database
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message }); // If an error occurs, return a 400 status with the error message
    }
};

export const login = async (req, res) => { // Export the login function, which currently just sends a "Login Route" response
    res.send("Login Route");
};

export const logout = async (req, res) => {// Export the logout function, which currently just sends a "Logout Route" response
    res.send("Logout Route");
};
