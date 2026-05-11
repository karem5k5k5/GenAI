"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../../config/env");
const error_1 = require("../../utils/error");
const AI = new openai_1.default({
    apiKey: env_1.envConfig.geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
class OpenAIService {
    async generateArticle(prompt, length) {
        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: `Generate a complete blog article about ${prompt}.
                    Requirements:
                    - Fully completed response
                    - Use headings
                    - Include introduction and conclusion
                    - Maximum length: ${length}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 5000
        });
        if (!response || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
            throw new error_1.InternalServerError("No content generated");
        }
        const content = response.choices[0].message.content;
        return content;
    }
    async generateBlogTitle(prompt) {
        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000
        });
        if (!response || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
            throw new error_1.InternalServerError("No content generated");
        }
        const content = response.choices[0].message.content;
        return content;
    }
    async resumeReview(prompt) {
        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 5000
        });
        if (!response || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
            throw new error_1.InternalServerError("No content generated");
        }
        const content = response.choices[0].message.content;
        return content;
    }
}
exports.default = new OpenAIService();
