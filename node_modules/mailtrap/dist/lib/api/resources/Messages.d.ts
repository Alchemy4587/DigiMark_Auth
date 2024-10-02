import { AxiosInstance } from "axios";
import { EmailHeaders, Message, MessageUpdateParams, Report, SpamReport } from "../../../types/api/messages";
export default class MessagesApi {
    private client;
    private messagesURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Gets email message by given `messageId`.
     */
    showEmailMessage(inboxId: number, messageId: number): Promise<Message>;
    /**
     * Updates message attributes (right now only the is_read attribute is available for modification).
     */
    updateMessage(inboxId: number, messageId: number, params: MessageUpdateParams): Promise<Message>;
    /**
     * Deletes message from inbox.
     */
    deleteMessage(inboxId: number, messageId: number): Promise<Message>;
    /**
     * Gets all messages in inboxes.
     */
    get(inboxId: number): Promise<Message[]>;
    /**
     * Forwards message to an email address. The email address must be confirmed by the recipient in advance.
     */
    forward(inboxId: number, messageId: number, emailToForward: string): Promise<Message>;
    /**
     * Gets a brief spam report by given `messageId`.
     */
    getSpamScore(inboxId: number, messageId: number): Promise<SpamReport>;
    /**
     * Gets a brief HTML report by message ID.
     */
    getHtmlAnalysis(inboxId: number, messageId: number): Promise<Report>;
    /**
     * Gets text email body, if it exists.
     */
    getTextMessage(inboxId: number, messageId: number): Promise<string>;
    /**
     * Gets raw email body.
     */
    getRawMessage(inboxId: number, messageId: number): Promise<string>;
    /**
     * Gets HTML source of email.
     */
    getMessageHtmlSource(inboxId: number, messageId: number): Promise<string>;
    /**
     * Gets formatted HTML email body. Not applicable for plain text emails.
     */
    getHtmlMessage(inboxId: number, messageId: number): Promise<string>;
    /**
     * Gets email message in .eml format.
     */
    getMessageAsEml(inboxId: number, messageId: number): Promise<string>;
    /**
     * Gets mail headers of a message.
     */
    getMailHeaders(inboxId: number, messageId: number): Promise<EmailHeaders>;
}
