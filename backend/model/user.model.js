import mongoose from "mongoose"; // Import mongoose, an ODM (Object Data Modeling) library for MongoDB, to define the schema and interact with the database
// Define the schema for the User model, which represents the structure of documents in the users collection
const userSchema = new mongoose.Schema({
    email: { // Email field: must be a string, required, and unique for each user
        type: String,
        required: true,
        unique: true
    },
    password: { // Password field: must be a string and required
        type: String,
        required: true
    },
    name: {// Name field: must be a string and required
        type: String,
        required: true
    },
    lastLogin: { // Last login date field: defaults to the current date when a user is created
        type: Date,
        default: Date.now
    },
    isVerified: { // Boolean field to check if the user's email is verified; defaults to false
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,// Field to store the token used to reset the user's password (optional)
    resetPasswordExpiresAt: Date, // Field to store the expiration date of the reset password token (optional)
    verificationToken: String, // Field to store the token used for verifying the user's email (optional)
    verificationTokenExpiresAt: Date,// Field to store the expiration date of the verification token (optional)
}, { timestamps: true }); // Options: add timestamps to automatically create and update `createdAt` and `updatedAt` fields

export const User = mongoose.model('User', userSchema);// Export the User model, which is created from the userSchema, to interact with the users collection in MongoDB
