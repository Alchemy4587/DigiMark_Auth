"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class AccountsAccessesApi {
    constructor(client, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.accountAccessesURL = `${GENERAL_ENDPOINT}/api/accounts/${this.accountId}/account_accesses`;
    }
    /**
     * Get list of account accesses for which specifier_type is User or Invite.
     * You have to have account admin/owner permissions for this endpoint to work.
     * If you specify project_ids, inbox_ids or domain_uuids, the endpoint will return account accesses for these resources.
     */
    async listAccountAccesses(filters) {
        const url = this.accountAccessesURL;
        const params = filters
            ? {
                ...(filters.domainUuids && { domain_uuids: filters.domainUuids }),
                ...(filters.inboxIds && { inbox_ids: filters.inboxIds }),
                ...(filters.projectIds && { project_ids: filters.projectIds }),
            }
            : {};
        return this.client.get(url, { params });
    }
    /**
     * If specifier type is User, it removes user permissions.
     * If specifier type is Invite or ApiToken, it removes specifier along with permissions.
     * You have to be an account admin/owner for this endpoint to work.
     */
    async removeAccountAccess(accountAccessId) {
        const url = `${this.accountAccessesURL}/${accountAccessId}`;
        return this.client.delete(url);
    }
}
exports.default = AccountsAccessesApi;
