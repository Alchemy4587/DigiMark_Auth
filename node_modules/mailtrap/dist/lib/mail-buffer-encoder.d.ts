import { Mail } from "../types/mailtrap";
/**
 * Checks if `mail` has `text` and it's an instance of Buffer, then converts to string.
 * If `mail` has `html` and it's an instance of `Buffer`, then converts to string.
 * If it has attachments, then converts `Buffer` content to `base64` string if needed.
 */
export default function encodeMailBuffers(mail: Mail): Mail;
