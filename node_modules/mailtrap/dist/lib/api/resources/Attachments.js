"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class AttachmentsApi {
    constructor(client, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.inboxesURL = `${GENERAL_ENDPOINT}/api/accounts/${this.accountId}/inboxes`;
    }
    /**
     * Get message attachments by `inboxId` and `messageId`.
     */
    async getList(inboxId, messageId) {
        const url = `${this.inboxesURL}/${inboxId}/messages/${messageId}/attachments`;
        return this.client.get(url);
    }
    /**
     * Get message attachments by `inboxId`.`messageId` and `attachmentId`.
     */
    async get(inboxId, messageId, attachmentId) {
        const url = `${this.inboxesURL}/${inboxId}/messages/${messageId}/attachments/${attachmentId}`;
        return this.client.get(url);
    }
}
exports.default = AttachmentsApi;
