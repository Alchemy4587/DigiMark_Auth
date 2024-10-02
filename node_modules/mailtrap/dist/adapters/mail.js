"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachement_1 = __importDefault(require("./attachement"));
const content_1 = __importDefault(require("./content"));
const headers_1 = __importDefault(require("./headers"));
const recipients_1 = __importStar(require("./recipients"));
const config_1 = __importDefault(require("../config"));
const { ERRORS } = config_1.default;
const { SUBJECT_REQUIRED, FROM_REQUIRED } = ERRORS;
/**
 * Checks if `from` property is missing, then returns error.
 * Then gathers common data for mail, then checks if mail es template based. If it is then returns mail.
 * Otherwise checks if subject is missing (if mail is not template based, subject is must), then returns error.
 * Then returns mail with all params needed.
 */
function adaptMail(data) {
    if (!data.from) {
        return { success: false, errors: [FROM_REQUIRED] };
    }
    const mail = {
        from: (0, recipients_1.adaptSingleRecipient)(data.from),
        to: (0, recipients_1.default)(data.to),
        cc: (0, recipients_1.default)(data.cc),
        bcc: (0, recipients_1.default)(data.bcc),
    };
    if (data.headers) {
        mail.headers = (0, headers_1.default)(data.headers);
    }
    if (data.attachments) {
        mail.attachments = data.attachments.map(attachement_1.default);
    }
    if (data.customVariables) {
        mail.custom_variables = data.customVariables;
    }
    if (!data.sandbox && data.templateUuid) {
        return {
            ...mail,
            template_uuid: data.templateUuid,
            ...(data.templateVariables && {
                template_variables: data.templateVariables,
            }),
        };
    }
    if (!data.subject) {
        return { success: false, errors: [SUBJECT_REQUIRED] };
    }
    const mailWithSubject = {
        ...mail,
        subject: data.subject,
    };
    if (data.category) {
        mailWithSubject.category = data.category;
    }
    if (data.text || data.html) {
        return {
            ...mailWithSubject,
            ...(data.text && { text: (0, content_1.default)(data.text) }),
            ...(data.html && { html: (0, content_1.default)(data.html) }),
        };
    }
    return mailWithSubject;
}
exports.default = adaptMail;
