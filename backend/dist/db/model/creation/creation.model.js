"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creation = void 0;
const mongoose_1 = require("mongoose");
const creation_schema_1 = require("./creation.schema");
exports.Creation = (0, mongoose_1.model)("Creation", creation_schema_1.creationSchema);
