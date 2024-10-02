"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adapts nodemailer headers to mailtrap compatible form.
 * If `nodemailerHeaders` is array of { key, value } objects, then converts to object.
 * Otherwise if value is string, keeps as is. If it's an array, first value.
 * @todo support multiple value per header
 */
function adaptHeaders(nodemailerHeaders) {
    if (Array.isArray(nodemailerHeaders)) {
        return nodemailerHeaders.reduce((acc, header) => {
            acc[header.key] = header.value;
            return acc;
        }, {});
    }
    const headerKeys = Object.keys(nodemailerHeaders);
    return headerKeys.reduce((acc, key) => {
        const value = nodemailerHeaders[key];
        if (typeof value === "string") {
            acc[key] = value;
            return acc;
        }
        if (Array.isArray(value)) {
            [acc[key]] = value; // TODO: support multiple value per header
            return acc;
        }
        acc[key] = value.value;
        return acc;
    }, {});
}
exports.default = adaptHeaders;
