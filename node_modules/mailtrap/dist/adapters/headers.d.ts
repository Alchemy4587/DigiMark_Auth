import { Headers } from "nodemailer/lib/mailer";
import { MailtrapHeaders } from "../types/mailtrap";
/**
 * Adapts nodemailer headers to mailtrap compatible form.
 * If `nodemailerHeaders` is array of { key, value } objects, then converts to object.
 * Otherwise if value is string, keeps as is. If it's an array, first value.
 * @todo support multiple value per header
 */
export default function adaptHeaders(nodemailerHeaders: Headers): MailtrapHeaders;
