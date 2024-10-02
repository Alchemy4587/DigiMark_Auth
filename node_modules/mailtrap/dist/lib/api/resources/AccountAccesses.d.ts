import { AxiosInstance } from "axios";
import { AccountAccessFilters, DeleteAccountAccessResponse } from "../../../types/api/account-accesses";
import { Resource } from "../../../types/api/permissions";
export default class AccountsAccessesApi {
    private client;
    private accountId?;
    private accountAccessesURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Get list of account accesses for which specifier_type is User or Invite.
     * You have to have account admin/owner permissions for this endpoint to work.
     * If you specify project_ids, inbox_ids or domain_uuids, the endpoint will return account accesses for these resources.
     */
    listAccountAccesses(filters?: AccountAccessFilters): Promise<Resource[]>;
    /**
     * If specifier type is User, it removes user permissions.
     * If specifier type is Invite or ApiToken, it removes specifier along with permissions.
     * You have to be an account admin/owner for this endpoint to work.
     */
    removeAccountAccess(accountAccessId: number): Promise<DeleteAccountAccessResponse>;
}
