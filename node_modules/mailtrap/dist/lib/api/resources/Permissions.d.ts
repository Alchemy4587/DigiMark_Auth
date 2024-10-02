import { AxiosInstance } from "axios";
import { PermissionResourceParams, Resource } from "../../../types/api/permissions";
export default class PermissionsApi {
    private client;
    private accountId?;
    private permissionsURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Manage user or token permissions. For this endpoint, you should send an array of objects (in JSON format) as the body of the request.
     * - `resource_type` can be account, billing, project, inbox or mailsend_domain.
     * - `resource_id` the ID of the resource
     * - `access_level` can be admin or viewer or their numbers 100 and 10 respectively
     * - `_destroy(optional)` a boolean. If true, instead of creating/updating the permission, it destroys it
     *
     * If you send a combination of resource_type and resource_id that already exists, the permission is updated. If the combination doesn’t exist, the permission is created.
     */
    bulkPermissionsUpdate(accountAccessId: number, permissions: PermissionResourceParams[]): Promise<Resource[]>;
    /**
     * Get all resources in your account (Inboxes, Projects, Domains, Billing and Account itself) to which the token has admin access.
     * @returns Returns the resources nested according to their hierarchy.
     */
    getResources(): Promise<Resource[]>;
}
