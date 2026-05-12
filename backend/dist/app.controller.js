"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./db/connection");
const global_error_handler_1 = require("./utils/global-error-handler");
const user_router_1 = __importDefault(require("./modules/user/user.router"));
const creation_router_1 = __importDefault(require("./modules/creation/creation.router"));
const cloudinary_config_1 = __importDefault(require("./pkg/cloudinary/cloudinary.config"));
const bootstrap = (app, express) => {
    // connect database
    (0, connection_1.connectDB)();
    // connect cloudinary
    (0, cloudinary_config_1.default)();
    // parse req body data
    app.use(express.json());
    // parse cookies 
    app.use((0, cookie_parser_1.default)());
    // setup cors
    const allowedOrigins = ["http://localhost:5173", "https://gen-ai-frontend-omega.vercel.app/"];
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin))
                callback(null, true);
            else
                callback(new Error("Not allowed by CORS"));
        },
        credentials: true
    }));
    // default router
    app.get("/", (req, res) => {
        return res.status(200).json({ success: true, message: "Hello from GenAI server" });
    });
    // user router
    app.use("/user", user_router_1.default);
    // creation router
    app.use("/creation", creation_router_1.default);
    // invalid router
    app.use("/{*dummy}", (req, res) => {
        return res.status(404).json({ success: false, message: "Invalid router" });
    });
    // global error handler
    app.use(global_error_handler_1.globalErrorHandler);
};
exports.bootstrap = bootstrap;
