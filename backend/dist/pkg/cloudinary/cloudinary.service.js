"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
class CloudinaryService {
    async uploadImage(image) {
        const result = await cloudinary_1.v2.uploader.upload(image);
        return result;
    }
    async removeBackground(image) {
        const result = await cloudinary_1.v2.uploader.upload(image.path, {
            transformation: [
                {
                    effect: "background_removal",
                    background_removal: "remove_the_background"
                }
            ]
        });
        return result;
    }
    async removeObject(image, object) {
        const result = await cloudinary_1.v2.uploader.upload(image.path, {
            transformation: [
                {
                    effect: `gen_remove:${object}`,
                }
            ]
        });
        return result;
    }
}
exports.default = new CloudinaryService();
