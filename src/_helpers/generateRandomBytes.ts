import { randomBytes } from "node:crypto";

export const generateRandomBytes = (size: number) => {
    const key = randomBytes(size);
    return key.toString("hex");
};