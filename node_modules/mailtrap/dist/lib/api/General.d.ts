import { AxiosInstance } from "axios";
import AccountAccessesApi from "./resources/AccountAccesses";
import AccountsApi from "./resources/Accounts";
import PermissionsApi from "./resources/Permissions";
export default class GeneralAPI {
    private client;
    private accountId?;
    accountAccesses: AccountAccessesApi;
    accounts: AccountsApi;
    permissions: PermissionsApi;
    constructor(client: AxiosInstance, accountId?: number);
}
