import OpenAI from "openai";
import { envConfig } from "../../config/env";
import { InternalServerError } from "../../utils/error";

const AI = new OpenAI({
    apiKey: envConfig.geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

class OpenAIService {
    async generateArticle(prompt: string, length: number) {
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
            throw new InternalServerError("No content generated");
        }

        const content = response.choices[0].message.content;
        return content;
    }

    async generateBlogTitle(prompt: string) {
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
            throw new InternalServerError("No content generated");
        }

        const content = response.choices[0].message.content;
        return content;
    }

    async resumeReview(prompt: string) {
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
            throw new InternalServerError("No content generated");
        }

        const content = response.choices[0].message.content;
        return content;
    }
}

export default new OpenAIService();