import { AxiosInstance } from "axios";
import ProjectsApi from "./resources/Projects";
import InboxesApi from "./resources/Inboxes";
import MessagesApi from "./resources/Messages";
import AttachmentsApi from "./resources/Attachments";
import { Mail, SendResponse } from "../../types/mailtrap";
export default class TestingAPI {
    private client;
    private testInboxId?;
    private accountId?;
    projects: ProjectsApi;
    inboxes: InboxesApi;
    messages: MessagesApi;
    attachments: AttachmentsApi;
    constructor(client: AxiosInstance, testInboxId?: number, accountId?: number);
    send(mail: Mail): Promise<SendResponse>;
}
