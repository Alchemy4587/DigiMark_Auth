import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [{email}];

    try {
        const response= await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "1156193a-94d7-4f7f-b93b-3eaffd295113",
            template_variables: {
                company_info_name: "DigiMark Consulting",
                name: name,
            },
        });

        console.log("Welcome Email Sent Successfully", response);
    } catch (error) {
        console.error(`Error Sending Wecome Email `,error);

        throw new Error(`Error Sending Wecome Email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.error(`Error Sending Password Reset Email`, error);

        throw new Error(`Error Sending Password Reset Email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password Reset Email Sent Successfully", response);
    } catch (error) {
        console.error(`Error Sending Password Success Email`,error);

        throw new Error(`Error Sending Password Reset Success Email: ${error}`);
    }
}