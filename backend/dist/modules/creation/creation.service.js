"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("../../pkg/openai"));
const creation_entity_1 = require("./entity/creation.entity");
const creation_enums_1 = require("./entity/creation.enums");
const creation_repository_1 = __importDefault(require("../../db/model/creation/creation.repository"));
const cloudinary_service_1 = __importDefault(require("../../pkg/cloudinary/cloudinary.service"));
const clibdrop_1 = __importDefault(require("../../pkg/clibdrop"));
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
class CreationService {
    async generateArticle(generateArticleDTO, user) {
        // call AI agent service
        const content = await openai_1.default.generateArticle(generateArticleDTO.prompt, generateArticleDTO.length);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = content;
        creation.prompt = generateArticleDTO.prompt;
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.ARTICLE;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return content;
    }
    async generateBlogTitle(generateBlogTitleDTO, user) {
        // call AI agent service
        const content = await openai_1.default.generateBlogTitle(generateBlogTitleDTO.prompt);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = content;
        creation.prompt = generateBlogTitleDTO.prompt;
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.TITLE;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return content;
    }
    async generateImage(generateImageDTO, user) {
        // call AI agent service
        const imageData = await clibdrop_1.default.generateImage(generateImageDTO.prompt);
        // convert image data to base64 ready to store in cloudinary
        const base64Image = `data:image/png;base64,${Buffer.from(imageData, "binary").toString("base64")}`;
        // store image in cloudinary
        const result = await cloudinary_service_1.default.uploadImage(base64Image);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = result.secure_url;
        creation.prompt = generateImageDTO.prompt;
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.IMAGE;
        creation.publish = generateImageDTO.publish;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return result.secure_url;
    }
    async removeImageBackground(image, user) {
        // call cloudinary service to remove background
        const result = await cloudinary_service_1.default.removeBackground(image);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = result.secure_url;
        creation.prompt = "remove image background";
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.IMAGE;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return result.secure_url;
    }
    async removeImageObject(removeImageObjectDTO, image, user) {
        // call cloudinary service to remove object
        const result = await cloudinary_service_1.default.removeObject(image, removeImageObjectDTO.object);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = result.secure_url;
        creation.prompt = `remove image object ${removeImageObjectDTO.object}`;
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.IMAGE;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return result.secure_url;
    }
    async resumeReview(resume, user) {
        // read pdf file data
        const dataBuffer = fs_1.default.readFileSync(resume.path);
        // parse pdf file
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        // create prompt
        const prompt = `Review this resume and provide feedback on the following:
        - strengths
        - weaknesses
        - suggestions for improvements
        - score
        
        Resume content:
        ${pdfData.text}
        `;
        // call AI agent service
        const content = await openai_1.default.resumeReview(prompt);
        // create new creation entity
        const creation = new creation_entity_1.Creation();
        creation.content = content;
        creation.prompt = "resume review";
        creation.userId = user._id;
        creation.type = creation_enums_1.CreationType.DOCUMENT;
        // save into database
        await creation_repository_1.default.create(creation);
        // return content to controller
        return content;
    }
    async getPublishedCreations() {
        // get published creations
        const creations = await creation_repository_1.default.find({ publish: true });
        // return creations
        return creations;
    }
}
exports.default = new CreationService();
