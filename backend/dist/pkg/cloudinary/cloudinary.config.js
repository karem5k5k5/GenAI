"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("../../config/env");
const connectCloudinary = async () => {
    cloudinary_1.v2.config({
        cloud_name: env_1.envConfig.cloudinaryCloudName,
        api_key: env_1.envConfig.cloudinaryApiKey,
        api_secret: env_1.envConfig.cloudinaryApiSecret
    });
};
exports.default = connectCloudinary;
