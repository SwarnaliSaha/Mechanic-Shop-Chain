"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const InventorySchema = new base_schema_1.BaseSchema({
    itemName: {
        type: String,
        required: true
    },
    minLimit: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isSpecial: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        default: 0
    }
});
exports.InventoryModel = (0, mongoose_1.model)("Inventory", InventorySchema);
