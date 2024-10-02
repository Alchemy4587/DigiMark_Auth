import { AxiosInstance } from "axios";
import { Project } from "../../../types/api/projects";
export default class ProjectsApi {
    private client;
    private accountId?;
    private projectsURL;
    constructor(client: AxiosInstance, accountId?: number);
    /**
     * Creates new project.
     */
    create(projectName: string): Promise<Project>;
    /**
     * Lists projects and their inboxes to which the API token has access.
     */
    getList(): Promise<Project[]>;
    /**
     * Gets the project and it's inboxes.
     */
    getById(projectId: number): Promise<Project>;
    /**
     * Updates project name. The project name is min 2 characters and max 100 characters long.
     */
    update(projectId: number, updatedName: string): Promise<Project>;
    /**
     * Deletes a project by its ID.
     */
    delete(projectId: number): Promise<Project>;
}
