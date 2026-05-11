"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creation_service_1 = __importDefault(require("./creation.service"));
const error_1 = require("../../utils/error");
class CreationController {
    async generateArticle(req, res) {
        // get data from req body
        const generateArticleDTO = req.body;
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.generateArticle(generateArticleDTO, user);
        // send response
        return res.status(201).json({ success: true, message: "article generated successfully", data: content });
    }
    async generateBlogTitle(req, res) {
        // get data from req body
        const generateBlogTitleDTO = req.body;
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.generateBlogTitle(generateBlogTitleDTO, user);
        // send response
        return res.status(201).json({ success: true, message: "blog title generated successfully", data: content });
    }
    async generateImage(req, res) {
        // get data from req body
        const generateImageDTO = req.body;
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.generateImage(generateImageDTO, user);
        // send response
        return res.status(201).json({ success: true, message: "image generated successfully", data: content });
    }
    async removeImageBackground(req, res) {
        // get image from req file
        const image = req.file;
        if (!image) {
            throw new error_1.NotFoundException("image not found");
        }
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.removeImageBackground(image, user);
        // send response
        return res.status(200).json({ success: true, message: "image background removed successfully", data: content });
    }
    async removeImageObject(req, res) {
        // get image from req file
        const image = req.file;
        if (!image) {
            throw new error_1.NotFoundException("image not found");
        }
        // get data from req body
        const removeImageObjectDTO = req.body;
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.removeImageObject(removeImageObjectDTO, image, user);
        // send response
        return res.status(200).json({ success: true, message: "image object removed successfully", data: content });
    }
    async resumeReview(req, res) {
        // get resume from req file
        const resume = req.file;
        if (!resume) {
            throw new error_1.NotFoundException("resume not found");
        }
        // check resume file type
        if (resume.mimetype !== "application/pdf") {
            throw new error_1.BadRequestException("resume file type must be pdf");
        }
        // check resume file size
        if (resume.size > 5 * 1024 * 1024) {
            throw new error_1.BadRequestException("resume file size must be less than 5MB");
        }
        // get user from req context
        const user = req.user;
        if (!user) {
            throw new error_1.NotFoundException("user not found");
        }
        // implement business logic
        const content = await creation_service_1.default.resumeReview(resume, user);
        // send response
        return res.status(201).json({ success: true, message: "resume reviewed successfully", data: content });
    }
    async getPublishedCreations(req, res) {
        // implement business logic
        const creations = await creation_service_1.default.getPublishedCreations();
        // send response
        return res.status(200).json({ success: true, message: "published creations fetched successfully", data: creations });
    }
}
exports.default = new CreationController();
