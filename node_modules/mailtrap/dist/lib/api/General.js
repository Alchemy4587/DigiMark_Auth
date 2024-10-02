"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAccesses_1 = __importDefault(require("./resources/AccountAccesses"));
const Accounts_1 = __importDefault(require("./resources/Accounts"));
const Permissions_1 = __importDefault(require("./resources/Permissions"));
class GeneralAPI {
    constructor(client, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.accountAccesses = new AccountAccesses_1.default(this.client, this.accountId);
        this.accounts = new Accounts_1.default(this.client);
        this.permissions = new Permissions_1.default(this.client, this.accountId);
    }
}
exports.default = GeneralAPI;
