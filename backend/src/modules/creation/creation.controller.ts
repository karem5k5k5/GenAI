import { Request, Response } from "express";
import creationService from "./creation.service";
import { GenerateArticleDTO, GenerateBlogTitleDTO, GenerateImageDTO, RemoveImageObjectDTO } from "./creation.dto";
import { BadRequestException, NotFoundException } from "../../utils/error";

class CreationController {
    async generateArticle(req: Request, res: Response) {
        // get data from req body
        const generateArticleDTO: GenerateArticleDTO = req.body

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.generateArticle(generateArticleDTO, user);

        // send response
        return res.status(201).json({ success: true, message: "article generated successfully", data: content });
    }

    async generateBlogTitle(req: Request, res: Response) {
        // get data from req body
        const generateBlogTitleDTO: GenerateBlogTitleDTO = req.body

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.generateBlogTitle(generateBlogTitleDTO, user);

        // send response
        return res.status(201).json({ success: true, message: "blog title generated successfully", data: content });
    }

    async generateImage(req: Request, res: Response) {
        // get data from req body
        const generateImageDTO: GenerateImageDTO = req.body

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.generateImage(generateImageDTO, user);

        // send response
        return res.status(201).json({ success: true, message: "image generated successfully", data: content });
    }

    async removeImageBackground(req: Request, res: Response) {
        // get image from req file
        const image = req.file;

        if (!image) {
            throw new NotFoundException("image not found");
        }

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.removeImageBackground(image, user);

        // send response
        return res.status(200).json({ success: true, message: "image background removed successfully", data: content });
    }

    async removeImageObject(req: Request, res: Response) {
        // get image from req file
        const image = req.file;

        if (!image) {
            throw new NotFoundException("image not found");
        }

        // get data from req body
        const removeImageObjectDTO: RemoveImageObjectDTO = req.body;

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.removeImageObject(removeImageObjectDTO, image, user);

        // send response
        return res.status(200).json({ success: true, message: "image object removed successfully", data: content });
    }

    async resumeReview(req: Request, res: Response) {
        // get resume from req file
        const resume = req.file;

        if (!resume) {
            throw new NotFoundException("resume not found");
        }

        // check resume file type
        if (resume.mimetype !== "application/pdf") {
            throw new BadRequestException("resume file type must be pdf");
        }

        // check resume file size
        if (resume.size > 5 * 1024 * 1024) {
            throw new BadRequestException("resume file size must be less than 5MB");
        }     

        // get user from req context
        const user = req.user;

        if (!user) {
            throw new NotFoundException("user not found");
        }

        // implement business logic
        const content = await creationService.resumeReview(resume, user);

        // send response
        return res.status(201).json({ success: true, message: "resume reviewed successfully", data: content });
    }

    async getPublishedCreations(req: Request, res: Response) {
        // implement business logic
        const creations = await creationService.getPublishedCreations();

        // send response
        return res.status(200).json({ success: true, message: "published creations fetched successfully", data: creations });
    }
}

export default new CreationController();