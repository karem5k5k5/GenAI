"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../utils/error");
const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query };
        const { success, error } = schema.safeParse(data);
        if (!success) {
            let errMessages = error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new error_1.BadRequestException("validation error", errMessages);
        }
        next();
    };
};
exports.isValid = isValid;
