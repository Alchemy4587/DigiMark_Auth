"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_stream_1 = require("node:stream");
/**
 * Checks if content type is rather string or buffer, returns content.
 * If content is Readble stream, then calls .read().
 * If content has recursive content property then calls the same function recursively.
 * Otherwise reads file.
 */
function adaptContent(content) {
    if (typeof content === "string" || content instanceof Buffer) {
        return content;
    }
    if (content instanceof node_stream_1.Readable) {
        return content.read();
    }
    if (content.content) {
        return adaptContent(content.content);
    }
    return (0, node_fs_1.readFileSync)(content.path);
}
exports.default = adaptContent;
