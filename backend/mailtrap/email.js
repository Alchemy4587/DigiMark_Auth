import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verfication"
        });

        console.log("Email Sent Successfully",response);
    } catch (error) {
        console.error(`Error Sending Verification:`,error);
        
        throw new Error(`Error Sending Verification Email: ${error}`);
    }
}