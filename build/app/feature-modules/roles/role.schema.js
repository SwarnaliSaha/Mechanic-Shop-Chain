"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const RoleSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        required: true
    }
});
exports.RoleModel = (0, mongoose_1.model)("Roles", RoleSchema);
