"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class AccountsApi {
    constructor(client) {
        this.client = client;
        this.accountsURL = `${GENERAL_ENDPOINT}/api/accounts`;
    }
    /**
     * Get a list of your Mailtrap accounts.
     * @returns Returns the list of accounts to which the API token has access.
     */
    async getAllAccounts() {
        const url = this.accountsURL;
        return this.client.get(url);
    }
}
exports.default = AccountsApi;
