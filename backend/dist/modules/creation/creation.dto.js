"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImageObjectSchema = exports.generateImageSchema = exports.generateBlogTitleSchema = exports.generateArticleSchema = void 0;
const zod_1 = require("zod");
exports.generateArticleSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1).max(1000),
    length: zod_1.z.number().min(100).max(10000)
});
exports.generateBlogTitleSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1).max(1000),
});
exports.generateImageSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1).max(1000),
    publish: zod_1.z.boolean().default(false)
});
exports.removeImageObjectSchema = zod_1.z.object({
    object: zod_1.z.string().min(1).max(100)
});
