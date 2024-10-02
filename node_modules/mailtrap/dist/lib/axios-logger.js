"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const MailtrapError_1 = __importDefault(require("./MailtrapError"));
/**
 * Axios error names guard.
 */
const hasErrorProperty = (obj, propertyName) => {
    return obj?.[propertyName] !== undefined;
};
/**
 * Error handler for axios response.
 */
function handleSendingError(error) {
    if (axios_1.default.isAxiosError(error)) {
        /**
         * Handles case where error is in `data.errors`.
         */
        const serverErrorsObject = error.response?.data &&
            typeof error.response.data === "object" &&
            "errors" in error.response.data &&
            error.response.data.errors;
        /**
         * Handles case where error is in `data.error`.
         */
        const serverErrorObject = error.response?.data &&
            typeof error.response.data === "object" &&
            "error" in error.response.data &&
            error.response.data.error;
        /**
         * Joins error messages contained in `name` property.
         */
        const errorNames = hasErrorProperty(serverErrorsObject, "name") &&
            serverErrorsObject.name.join(", ");
        /**
         * Joins error messages contained in `base` property.
         */
        const errorBase = hasErrorProperty(serverErrorsObject, "base") &&
            serverErrorsObject.base.join(", ");
        /**
         * Selects available error.
         */
        const message = errorNames ||
            errorBase ||
            serverErrorsObject ||
            serverErrorObject ||
            error.message;
        // @ts-expect-error weird typing around Error class, but it's tested to work
        throw new MailtrapError_1.default(message, { cause: error });
    }
    throw error; // should not happen, but otherwise rethrow error as is
}
exports.default = handleSendingError;
