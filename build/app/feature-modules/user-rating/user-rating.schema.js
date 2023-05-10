"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const RateSchema = new base_schema_1.BaseSchema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Shops',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
exports.RatingModel = (0, mongoose_1.model)("Ratings", RateSchema);
