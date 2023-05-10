"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const RequirementSchema = new base_schema_1.BaseSchema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shops",
        required: true
    },
    partsRequired: [
        {
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Inventory",
                required: true
            },
            requiredQty: {
                type: Number,
                required: true
            }
        }
    ],
    isApproved: {
        type: Boolean,
        default: false
    }
});
exports.RequirementModel = (0, mongoose_1.model)("Requirements", RequirementSchema);
