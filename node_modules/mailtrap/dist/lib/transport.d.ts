import { Transport } from "nodemailer";
import MailMessage from "nodemailer/lib/mailer/mail-message";
import { MailtrapClientConfig } from "../types/mailtrap";
import { MailtrapResponse, MailtrapTransporter, NormalizeCallback } from "../types/transport";
/**
 * Mailtrap transport for NodeMailer.
 */
declare class MailtrapTransport implements Transport<MailtrapResponse> {
    name: string;
    version: string;
    private client;
    /**
     * Initialize transport `name`, `version` and `client`.
     */
    constructor(options: MailtrapClientConfig);
    /**
     * Send message via `Mailtrap` client.
     */
    send(nodemailerMessage: MailMessage<MailtrapResponse>, callback: NormalizeCallback): void;
}
/**
 * Extends `nodemailer` types to support Mailtrap API params.
 */
declare module "nodemailer" {
    function createTransport(transport: MailtrapTransport): MailtrapTransporter;
}
declare const _default: (options: MailtrapClientConfig) => MailtrapTransport;
export default _default;
