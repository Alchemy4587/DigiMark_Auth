import { Mail, SendError } from "../types/mailtrap";
import { MailtrapMailOptions } from "../types/transport";
/**
 * Checks if `from` property is missing, then returns error.
 * Then gathers common data for mail, then checks if mail es template based. If it is then returns mail.
 * Otherwise checks if subject is missing (if mail is not template based, subject is must), then returns error.
 * Then returns mail with all params needed.
 */
export default function adaptMail(data: MailtrapMailOptions): Mail | SendError;
