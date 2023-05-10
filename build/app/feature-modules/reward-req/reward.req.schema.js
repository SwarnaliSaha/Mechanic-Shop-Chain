"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRequirementModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const RewardRequirementSchema = new base_schema_1.BaseSchema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shops",
        required: true
    },
    reward: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});
exports.RewardRequirementModel = (0, mongoose_1.model)("RewardRequirements", RewardRequirementSchema);
