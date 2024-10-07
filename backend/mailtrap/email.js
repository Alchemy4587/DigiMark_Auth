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