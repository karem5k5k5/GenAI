import { GenerateArticleDTO, GenerateBlogTitleDTO, GenerateImageDTO, RemoveImageObjectDTO } from "./creation.dto";
import { IUser } from "../user/entity/user.entity";
import openAIService from "../../pkg/openai";
import { Creation } from "./entity/creation.entity";
import { CreationType } from "./entity/creation.enums";
import creationRepository from "../../db/model/creation/creation.repository";
import cloudinaryService from "../../pkg/cloudinary/cloudinary.service";
import clibDropService from "../../pkg/clibdrop";
import fs from "fs";
import pdfParse from "pdf-parse";

class CreationService {
    async generateArticle(generateArticleDTO: GenerateArticleDTO, user: IUser) {
        // call AI agent service
        const content = await openAIService.generateArticle(generateArticleDTO.prompt, generateArticleDTO.length);

        // create new creation entity
        const creation = new Creation();
        creation.content = content;
        creation.prompt = generateArticleDTO.prompt;
        creation.userId = user._id;
        creation.type = CreationType.ARTICLE;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return content;
    }

    async generateBlogTitle(generateBlogTitleDTO: GenerateBlogTitleDTO, user: IUser) {
        // call AI agent service
        const content = await openAIService.generateBlogTitle(generateBlogTitleDTO.prompt);

        // create new creation entity
        const creation = new Creation();
        creation.content = content;
        creation.prompt = generateBlogTitleDTO.prompt;
        creation.userId = user._id;
        creation.type = CreationType.TITLE;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return content;
    }

    async generateImage(generateImageDTO: GenerateImageDTO, user: IUser) {
        // call AI agent service
        const imageData = await clibDropService.generateImage(generateImageDTO.prompt);

        // convert image data to base64 ready to store in cloudinary
        const base64Image = `data:image/png;base64,${Buffer.from(imageData, "binary").toString("base64")}`;

        // store image in cloudinary
        const result = await cloudinaryService.uploadImage(base64Image);

        // create new creation entity
        const creation = new Creation();
        creation.content = result.secure_url;
        creation.prompt = generateImageDTO.prompt;
        creation.userId = user._id;
        creation.type = CreationType.IMAGE;
        creation.publish = generateImageDTO.publish;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return result.secure_url;
    }

    async removeImageBackground(image: Express.Multer.File, user: IUser) {
        // call cloudinary service to remove background
        const result = await cloudinaryService.removeBackground(image);

        // create new creation entity
        const creation = new Creation();
        creation.content = result.secure_url;
        creation.prompt = "remove image background";
        creation.userId = user._id;
        creation.type = CreationType.IMAGE;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return result.secure_url;
    }

    async removeImageObject(removeImageObjectDTO: RemoveImageObjectDTO, image: Express.Multer.File, user: IUser) {
        // call cloudinary service to remove object
        const result = await cloudinaryService.removeObject(image, removeImageObjectDTO.object);

        // create new creation entity
        const creation = new Creation();
        creation.content = result.secure_url;
        creation.prompt = `remove image object ${removeImageObjectDTO.object}`;
        creation.userId = user._id;
        creation.type = CreationType.IMAGE;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return result.secure_url;
    }

    async resumeReview(resume: Express.Multer.File, user: IUser) {
        // read pdf file data
        const dataBuffer = fs.readFileSync(resume.path);

        // parse pdf file
        const pdfData = await pdfParse(dataBuffer);

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
        const content = await openAIService.resumeReview(prompt);

        // create new creation entity
        const creation = new Creation();
        creation.content = content;
        creation.prompt = "resume review";
        creation.userId = user._id;
        creation.type = CreationType.DOCUMENT;

        // save into database
        await creationRepository.create(creation);

        // return content to controller
        return content;
    }

    async getPublishedCreations() {
        // get published creations
        const creations = await creationRepository.find({ publish: true })

        // return creations
        return creations
    }
}

export default new CreationService()