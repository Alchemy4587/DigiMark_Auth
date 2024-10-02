"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailtrapClient_1 = __importDefault(require("./MailtrapClient"));
const normalizer_1 = __importDefault(require("./normalizer"));
const config_1 = __importDefault(require("../config"));
const { TRANSPORT_SETTINGS } = config_1.default;
const { NAME } = TRANSPORT_SETTINGS;
/**
 * Avoid TypeScript treating project root as dist root.
 */
const packageData = require("../../package.json");
/**
 * Mailtrap transport for NodeMailer.
 */
class MailtrapTransport {
    /**
     * Initialize transport `name`, `version` and `client`.
     */
    constructor(options) {
        this.name = NAME;
        this.version = packageData.version;
        this.client = new MailtrapClient_1.default(options);
    }
    /**
     * Send message via `Mailtrap` client.
     */
    send(nodemailerMessage, callback) {
        nodemailerMessage.normalize((0, normalizer_1.default)(this.client, callback));
    }
}
exports.default = (options) => new MailtrapTransport(options);
