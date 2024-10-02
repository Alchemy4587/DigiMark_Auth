import { AxiosInstance } from "axios";
import { User } from "../../../types/api/accounts";
export default class AccountsApi {
    private client;
    private accountsURL;
    constructor(client: AxiosInstance);
    /**
     * Get a list of your Mailtrap accounts.
     * @returns Returns the list of accounts to which the API token has access.
     */
    getAllAccounts(): Promise<User[]>;
}
