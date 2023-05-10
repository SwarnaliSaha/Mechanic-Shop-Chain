"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const ShopSchema = new base_schema_1.BaseSchema({
    shopName: {
        type: String
    },
    inventory: [
        {
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Inventory',
                required: true
            },
            qty: {
                type: Number
            },
            status: {
                type: Boolean
            }
        }
    ],
    points: {
        type: Number,
        default: 0
    },
    pendingPoints: {
        type: Number,
        default: 0
    },
    revenue: {
        type: Number,
        default: 0
    },
    transactionApprovalStatus: {
        type: Boolean,
        default: false
    },
    redeemedGifts: {
        type: [String]
    },
    rating: {
        type: Number,
        default: 0
    }
});
exports.ShopModel = (0, mongoose_1.model)("Shops", ShopSchema);
