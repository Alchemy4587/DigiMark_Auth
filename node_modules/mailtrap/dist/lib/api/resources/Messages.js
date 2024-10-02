"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class MessagesApi {
    constructor(client, accountId) {
        this.client = client;
        this.messagesURL = `${GENERAL_ENDPOINT}/api/accounts/${accountId}/inboxes`;
    }
    /**
     * Gets email message by given `messageId`.
     */
    async showEmailMessage(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}`;
        return this.client.get(url);
    }
    /**
     * Updates message attributes (right now only the is_read attribute is available for modification).
     */
    async updateMessage(inboxId, messageId, params) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}`;
        const data = { message: { is_read: params.isRead } };
        return this.client.patch(url, data);
    }
    /**
     * Deletes message from inbox.
     */
    async deleteMessage(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}`;
        return this.client.delete(url);
    }
    /**
     * Gets all messages in inboxes.
     */
    async get(inboxId) {
        const url = `${this.messagesURL}/${inboxId}/messages`;
        return this.client.get(url);
    }
    /**
     * Forwards message to an email address. The email address must be confirmed by the recipient in advance.
     */
    async forward(inboxId, messageId, emailToForward) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/forward`;
        const data = { email: emailToForward };
        return this.client.post(url, data);
    }
    /**
     * Gets a brief spam report by given `messageId`.
     */
    async getSpamScore(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/spam_report`;
        return this.client.get(url);
    }
    /**
     * Gets a brief HTML report by message ID.
     */
    async getHtmlAnalysis(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/analyze`;
        return this.client.get(url);
    }
    /**
     * Gets text email body, if it exists.
     */
    async getTextMessage(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/body.txt`;
        return this.client.get(url);
    }
    /**
     * Gets raw email body.
     */
    async getRawMessage(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/body.raw`;
        return this.client.get(url);
    }
    /**
     * Gets HTML source of email.
     */
    async getMessageHtmlSource(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/body.htmlsource`;
        return this.client.get(url);
    }
    /**
     * Gets formatted HTML email body. Not applicable for plain text emails.
     */
    async getHtmlMessage(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/body.html`;
        return this.client.get(url);
    }
    /**
     * Gets email message in .eml format.
     */
    async getMessageAsEml(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/body.eml`;
        return this.client.get(url);
    }
    /**
     * Gets mail headers of a message.
     */
    async getMailHeaders(inboxId, messageId) {
        const url = `${this.messagesURL}/${inboxId}/messages/${messageId}/mail_headers`;
        return this.client.get(url);
    }
}
exports.default = MessagesApi;
