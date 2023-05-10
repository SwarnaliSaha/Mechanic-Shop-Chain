"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const UserSchema = new base_schema_1.BaseSchema({
    userName: {
        type: String,
        required: true
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Roles',
    },
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Shops',
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.UserModel = (0, mongoose_1.model)("Users", UserSchema);
