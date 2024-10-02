import { Attachment as NodemailerAttachment } from "nodemailer/lib/mailer";
import { Attachment } from "../types/mailtrap";
/**
 * Adopts Nodemailer attachment to Mailtrap.
 * Checks if filename or content are missing, then rejects with error.
 * Otherwise specifies type of content, then builds attachment object for Mailtrap.
 * @todo throw error when only filename is provided
 */
export default function adaptAttachment(nodemailerAttachment: NodemailerAttachment): Attachment;
