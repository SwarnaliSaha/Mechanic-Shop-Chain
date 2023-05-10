"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Roles = {
    admin: new mongoose_1.default.mongo.ObjectId("643eb96fc8f5f358c3db8d0f"),
    shopKeeper: new mongoose_1.default.mongo.ObjectId("643eb983c8f5f358c3db8d12")
};
