"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
class ClipDropService {
    async generateImage(prompt) {
        const formData = new FormData();
        formData.append('prompt', prompt);
        const { data } = await axios_1.default.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': env_1.envConfig.clipDropApiKey
            },
            responseType: "arraybuffer"
        });
        return data;
    }
}
exports.default = new ClipDropService();
