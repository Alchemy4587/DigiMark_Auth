import { AxiosInstance } from "axios";
import { Inbox, UpdateInboxParams } from "../../../types/api/inboxes";
export default class InboxesApi {
    private client;
    private accountId?;
    private inboxesURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Creates an inbox in a project.
     */
    create(projectId: number, inboxName: string): Promise<Inbox>;
    /**
     * Gets inbox attributes by inbox id.
     */
    getInboxAttributes(inboxId: number): Promise<Inbox>;
    /**
     * Deletes an inbox with all its emails.
     */
    delete(inboxId: number): Promise<Inbox>;
    /**
     * Updates inbox name, inbox email username.
     */
    updateInbox(inboxId: number, params: UpdateInboxParams): Promise<Inbox>;
    /**
     * Deletes all messages (emails) from inbox.
     */
    cleanInbox(inboxId: number): Promise<Inbox>;
    /**
     * Marks all messages in the inbox as read.
     */
    markAsRead(inboxId: number): Promise<Inbox>;
    /**
     * Resets SMTP credentials of the inbox.
     */
    resetCredentials(inboxId: number): Promise<Inbox>;
    /**
     * Turns the email address of the inbox on/off.
     */
    enableEmailAddress(inboxId: number): Promise<Inbox>;
    /**
     * Resets username of email address per inbox.
     */
    resetEmailAddress(inboxId: number): Promise<Inbox>;
    /**
     * Gets a list of inboxes.
     */
    getList(): Promise<Inbox[]>;
}
