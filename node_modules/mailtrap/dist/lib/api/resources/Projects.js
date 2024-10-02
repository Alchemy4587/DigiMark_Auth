"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const { CLIENT_SETTINGS } = config_1.default;
const { GENERAL_ENDPOINT } = CLIENT_SETTINGS;
class ProjectsApi {
    constructor(client, accountId) {
        this.client = client;
        this.accountId = accountId;
        this.projectsURL = `${GENERAL_ENDPOINT}/api/accounts/${this.accountId}/projects`;
    }
    /**
     * Creates new project.
     */
    async create(projectName) {
        const data = { project: { name: projectName } };
        return this.client.post(this.projectsURL, data);
    }
    /**
     * Lists projects and their inboxes to which the API token has access.
     */
    async getList() {
        return this.client.get(this.projectsURL);
    }
    /**
     * Gets the project and it's inboxes.
     */
    async getById(projectId) {
        const url = `${this.projectsURL}/${projectId}`;
        return this.client.get(url);
    }
    /**
     * Updates project name. The project name is min 2 characters and max 100 characters long.
     */
    async update(projectId, updatedName) {
        const url = `${this.projectsURL}/${projectId}`;
        const data = { project: { name: updatedName } };
        return this.client.patch(url, data);
    }
    /**
     * Deletes a project by its ID.
     */
    async delete(projectId) {
        const url = `${this.projectsURL}/${projectId}`;
        return this.client.delete(url);
    }
}
exports.default = ProjectsApi;
