import MailtrapClient from "./MailtrapClient";
import { NormalizeCallbackData, NormalizeCallbackError, NormalizeCallback } from "../types/transport";
/**
 * Callback function for `Nodemailer.normalize` method which introduces Mailtrap integration.
 * Uses function curring to inject dependencies like `transport client` and `nodemailer default callback object`.
 */
export default function normalizeCallback(client: MailtrapClient, callback: NormalizeCallback): (err: NormalizeCallbackError, data: NormalizeCallbackData) => void | Promise<void>;
