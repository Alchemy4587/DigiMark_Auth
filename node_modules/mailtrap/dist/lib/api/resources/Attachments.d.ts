import { AxiosInstance } from "axios";
import { Attachment } from "../../../types/api/attachments";
export default class AttachmentsApi {
    private client;
    private accountId?;
    private inboxesURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Get message attachments by `inboxId` and `messageId`.
     */
    getList(inboxId: number, messageId: number): Promise<Attachment[]>;
    /**
     * Get message attachments by `inboxId`.`messageId` and `attachmentId`.
     */
    get(inboxId: number, messageId: number, attachmentId: number): Promise<Attachment>;
}
