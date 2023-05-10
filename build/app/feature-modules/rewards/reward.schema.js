"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const RewardsSchema = new base_schema_1.BaseSchema({
    rewardName: {
        type: String,
        required: true
    },
    rewardPoints: {
        type: Number,
        reqiered: true
    }
});
exports.RewardsModel = (0, mongoose_1.model)("Rewards", RewardsSchema);
