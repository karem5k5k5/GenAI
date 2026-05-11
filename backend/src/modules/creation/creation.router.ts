import { Router } from "express";
import { Authenticate } from "../../middleware/auth.middleware";
import { isValid } from "../../middleware/validation.middleware";
import { generateArticleSchema, generateBlogTitleSchema, generateImageSchema, removeImageObjectSchema } from "./creation.dto";
import creationController from "./creation.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post("/generate-article", Authenticate, isValid(generateArticleSchema), creationController.generateArticle);
router.post("/generate-title", Authenticate, isValid(generateBlogTitleSchema), creationController.generateBlogTitle);
router.post("/generate-image", Authenticate, isValid(generateImageSchema), creationController.generateImage);
router.patch("/remove-background", upload.single("image"), Authenticate, creationController.removeImageBackground);
router.patch("/remove-object", upload.single("image"), Authenticate, isValid(removeImageObjectSchema), creationController.removeImageObject);
router.post("/resume-review", upload.single("resume"), Authenticate, creationController.resumeReview);
router.get("/published", Authenticate, creationController.getPublishedCreations);

export default router;