import { z } from "zod";

export const generateArticleSchema = z.object({
    prompt: z.string().min(1).max(1000),
    length: z.number().min(100).max(10000)
})

export type GenerateArticleDTO = z.infer<typeof generateArticleSchema>

export const generateBlogTitleSchema = z.object({
    prompt: z.string().min(1).max(1000),
})

export type GenerateBlogTitleDTO = z.infer<typeof generateBlogTitleSchema>

export const generateImageSchema = z.object({
    prompt: z.string().min(1).max(1000),
    publish: z.boolean().default(false)
})

export type GenerateImageDTO = z.infer<typeof generateImageSchema>

export const removeImageObjectSchema = z.object({
    object: z.string().min(1).max(100)
})

export type RemoveImageObjectDTO = z.infer<typeof removeImageObjectSchema>