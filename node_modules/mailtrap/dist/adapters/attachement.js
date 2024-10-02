"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const { ERRORS } = config_1.default;
const { FILENAME_REQUIRED, CONTENT_REQUIRED } = ERRORS;
/**
 * Adopts Nodemailer attachment to Mailtrap.
 * Checks if filename or content are missing, then rejects with error.
 * Otherwise specifies type of content, then builds attachment object for Mailtrap.
 * @todo throw error when only filename is provided
 */
function adaptAttachment(nodemailerAttachment) {
    if (!nodemailerAttachment.filename) {
        throw new Error(FILENAME_REQUIRED);
    }
    if (!nodemailerAttachment.content) {
        throw new Error(CONTENT_REQUIRED);
    }
    const content = typeof nodemailerAttachment.content === "string" ||
        nodemailerAttachment.content instanceof Buffer
        ? nodemailerAttachment.content
        : nodemailerAttachment.content.read();
    return {
        filename: nodemailerAttachment.filename,
        content,
        disposition: nodemailerAttachment.contentDisposition,
        content_id: nodemailerAttachment.cid,
        type: nodemailerAttachment.contentType,
    };
}
exports.default = adaptAttachment;
