import bcryptjs from 'bcryptjs';// Import bcryptjs, a library used to hash passwords
import crypto from "crypto";

import { User } from "../model/user.model.js"; // Import the User model to interact with the users collection in the database
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { 
    sendPasswordResetEmail, 
    sendResetSuccessEmail, 
    sendVerificationEmail, 
    sendWelcomeEmail 
} from "../mailtrap/email.js";
// Export the signup function to handle user registration
export const signup = async (req, res) => {
    const { email, password, name } = req.body; 
    // Extract email, password, and name from the incoming request body
    try {
        if (!email || !password || !name) { // Check if any required field is missing, and throw an error if so
            throw new Error("All fields are required");
        }    
        // Check if a user with the provided email already exists in the database  
        const userAlreadyExist = await User.findOne({ email });       
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
        
        //jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message }); // If an error occurs, return a 400 status with the error message
    }
};


export const verifyEmail = async (req,res) =>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in Verify Email",error);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const login = async (req, res) => { // Export the login function response
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid Credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid Credentiatls"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({success:false, message: error.message});
    }
};

export const logout = async (req, res) => {// Export the logout function response
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out Successfully"});
};

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found"});
        }

        //Generate Reset Token
        const resetToken = crypto.randomBytes(20).toString("Hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        //Send Email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Password Reset Link Sent To Your Email"});
    } catch (error) {
        console.log("Error in Forgot Password", error);
        res.status(400).json({success: false, message:error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or Expired Token"});
        }

        //Update Password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Password Reset Successful"});
    } catch (error) {
        console.log("Error in Reset Password", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req,userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({success:true, user});

    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({ success: false, message:error.message });
    }
}