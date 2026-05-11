"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const error_1 = require("../utils/error");
const token_1 = require("../utils/token");
const user_repository_1 = __importDefault(require("../db/model/user/user.repository"));
const Authenticate = async (req, res, next) => {
    // get token from cookies
    const token = req.cookies.accessToken;
    if (!token) {
        throw new error_1.UnAuthorizedException("jwt is required");
    }
    // verify token
    const payload = (0, token_1.verifyToken)(token);
    // check user existence
    const user = await user_repository_1.default.findById(payload._id);
    if (!user) {
        throw new error_1.NotFoundException("user not found");
    }
    // inject user into req
    req.user = user;
    // call next
    next();
};
exports.Authenticate = Authenticate;
