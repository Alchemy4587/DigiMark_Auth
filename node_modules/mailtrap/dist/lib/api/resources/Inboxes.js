"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class InboxesApi {
    constructor(client, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.inboxesURL = `${GENERAL_ENDPOINT}/api/accounts/${this.accountId}/inboxes`;
    }
    /**
     * Creates an inbox in a project.
     */
    async create(projectId, inboxName) {
        const url = `${GENERAL_ENDPOINT}/api/accounts/${this.accountId}/projects/${projectId}/inboxes`;
        const data = { inbox: { name: inboxName } };
        return this.client.post(url, data);
    }
    /**
     * Gets inbox attributes by inbox id.
     */
    async getInboxAttributes(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}`;
        return this.client.get(url);
    }
    /**
     * Deletes an inbox with all its emails.
     */
    async delete(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}`;
        return this.client.delete(url);
    }
    /**
     * Updates inbox name, inbox email username.
     */
    async updateInbox(inboxId, params) {
        const url = `${this.inboxesURL}/${inboxId}`;
        const data = {
            inbox: {
                name: params.name,
                email_username: params.emailUsername,
            },
        };
        return this.client.patch(url, data);
    }
    /**
     * Deletes all messages (emails) from inbox.
     */
    async cleanInbox(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}/clean`;
        return this.client.patch(url);
    }
    /**
     * Marks all messages in the inbox as read.
     */
    async markAsRead(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}/all_read`;
        return this.client.patch(url);
    }
    /**
     * Resets SMTP credentials of the inbox.
     */
    async resetCredentials(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}/reset_credentials`;
        return this.client.patch(url);
    }
    /**
     * Turns the email address of the inbox on/off.
     */
    async enableEmailAddress(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}/toggle_email_username`;
        return this.client.patch(url);
    }
    /**
     * Resets username of email address per inbox.
     */
    async resetEmailAddress(inboxId) {
        const url = `${this.inboxesURL}/${inboxId}/reset_email_username`;
        return this.client.patch(url);
    }
    /**
     * Gets a list of inboxes.
     */
    async getList() {
        return this.client.get(this.inboxesURL);
    }
}
exports.default = InboxesApi;
