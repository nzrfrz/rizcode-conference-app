"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomBytes = void 0;
const node_crypto_1 = require("node:crypto");
const generateRandomBytes = (size) => {
    const key = (0, node_crypto_1.randomBytes)(size);
    return key.toString("hex");
};
exports.generateRandomBytes = generateRandomBytes;
//# sourceMappingURL=generateRandomBytes.js.map