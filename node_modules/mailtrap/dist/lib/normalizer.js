"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("../adapters/mail"));
const config_1 = __importDefault(require("../config"));
const { ERRORS } = config_1.default;
const { SENDING_FAILED, NO_DATA_ERROR } = ERRORS;
/**
 * Callback function for `Nodemailer.normalize` method which introduces Mailtrap integration.
 * Uses function curring to inject dependencies like `transport client` and `nodemailer default callback object`.
 */
function normalizeCallback(client, callback) {
    return (err, data) => {
        if (err) {
            return callback(err, { success: false, errors: [err.message] });
        }
        if (data) {
            const mail = (0, mail_1.default)(data);
            if ("errors" in mail) {
                return callback(new Error(...mail.errors), {
                    success: false,
                    errors: mail.errors,
                });
            }
            const mailtrapClient = data.sandbox ? client.testing : client;
            return mailtrapClient
                .send(mail)
                .then((sendResponse) => callback(null, sendResponse))
                .catch((error) => {
                callback(new Error(error), {
                    success: false,
                    errors: [SENDING_FAILED],
                });
            });
        }
        return callback(new Error(NO_DATA_ERROR), {
            success: false,
            errors: [NO_DATA_ERROR],
        });
    };
}
exports.default = normalizeCallback;
