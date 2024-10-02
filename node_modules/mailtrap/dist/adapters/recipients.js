"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSingleRecipient = void 0;
/**
 * If type of `recipient` is string, then wraps it into email object.
 * Otherwise maps into { `name`, `email` } pair.
 */
function adaptSingleRecipient(recipient) {
    if (typeof recipient === "string") {
        return { email: recipient };
    }
    return { name: recipient.name, email: recipient.address };
}
exports.adaptSingleRecipient = adaptSingleRecipient;
/**
 * If there is no recipient, then returns empty array.
 * If it's not array, then adopts recipient and wraps into array.
 * Otherwise maps trough recipients and adopts each one for Mailtrap.
 */
function adaptRecipients(recipients) {
    if (!recipients) {
        return [];
    }
    if (!Array.isArray(recipients)) {
        return [adaptSingleRecipient(recipients)];
    }
    return recipients.map(adaptSingleRecipient);
}
exports.default = adaptRecipients;
