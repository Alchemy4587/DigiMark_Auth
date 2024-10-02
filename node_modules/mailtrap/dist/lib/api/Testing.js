"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Projects_1 = __importDefault(require("./resources/Projects"));
const Inboxes_1 = __importDefault(require("./resources/Inboxes"));
const Messages_1 = __importDefault(require("./resources/Messages"));
const Attachments_1 = __importDefault(require("./resources/Attachments"));
const mail_buffer_encoder_1 = __importDefault(require("../mail-buffer-encoder"));
const config_1 = __importDefault(require("../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { TESTING_ENDPOINT } = CLIENT_SETTINGS;
class TestingAPI {
    constructor(client, testInboxId, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.testInboxId = testInboxId;
        this.projects = new Projects_1.default(this.client, this.accountId);
        this.inboxes = new Inboxes_1.default(this.client, this.accountId);
        this.messages = new Messages_1.default(this.client, this.accountId);
        this.attachments = new Attachments_1.default(this.client, this.accountId);
    }
    async send(mail) {
        const url = `${TESTING_ENDPOINT}/api/send/${this.testInboxId}`;
        const preparedMail = (0, mail_buffer_encoder_1.default)(mail);
        return this.client.post(url, preparedMail);
    }
}
exports.default = TestingAPI;
