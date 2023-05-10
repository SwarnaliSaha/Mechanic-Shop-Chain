"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const base_schema_1 = require("../../utility/base-schema");
const mongoose_1 = require("mongoose");
const SaleSchema = new base_schema_1.BaseSchema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Shops',
        required: true
    },
    itemsPurchased: [
        {
            itemName: {
                type: String,
                required: true
            },
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Inventory',
                required: true
            },
            soldQty: {
                type: Number,
                required: true
            },
            subTotal: {
                type: Number
            }
        }
    ],
    grandTotal: {
        type: Number
    }
});
exports.SaleModel = (0, mongoose_1.model)("Sales", SaleSchema);
