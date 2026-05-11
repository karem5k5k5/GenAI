import { v2 as cloudinary } from "cloudinary";

class CloudinaryService {
    async uploadImage(image: string) {
        const result = await cloudinary.uploader.upload(image);
        return result;
    }

    async removeBackground(image: Express.Multer.File) {
        const result = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: "background_removal",
                    background_removal: "remove_the_background"
                }
            ]
        })

        return result;
    }

    async removeObject(image: Express.Multer.File, object: string) {
        const result = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: `gen_remove:${object}`,
                }
            ]
        })

        return result;
    }
}

export default new CloudinaryService();