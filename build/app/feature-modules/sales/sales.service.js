"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sales_repo_1 = __importDefault(require("./sales.repo"));
const inventory_service_1 = __importDefault(require("../inventory/inventory.service"));
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const shop_response_1 = require("../shops/shop-response");
const mongoose_1 = require("mongoose");
const pipeline_1 = require("../../utility/pipeline");
const create = (bill) => sales_repo_1.default.create(bill);
const generateBill = (bill) => __awaiter(void 0, void 0, void 0, function* () {
    bill.grandTotal = 0;
    const shopId = bill.shopId;
    const shop = yield shop_service_1.default.findOne({ _id: shopId });
    if (!shop)
        throw shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    for (let item of bill.itemsPurchased) {
        const itemId = item.itemId;
        const itemObjFromInventory = yield inventory_service_1.default.findOne({ _id: itemId });
        const price = itemObjFromInventory.price;
        const qty = item.soldQty;
        item.subTotal = (price * qty);
        bill.grandTotal += item.subTotal;
        //reducing the quantity of that item from shop inventory in local inventory object
        const itemObjFromShop = yield shop_service_1.default.findItem(shopId, itemId);
        console.log(itemObjFromShop);
        const qtyInTheShop = itemObjFromShop.inventory[0].qty;
        const reducedqty = qtyInTheShop - (item.soldQty);
        //changing the status of that particular item in the shop inventory if the qty is less than the min-limit
        for (let obj of shop.inventory) {
            if (obj.itemId == item.itemId) {
                obj.qty = reducedqty;
                if (reducedqty < itemObjFromInventory.minLimit) {
                    obj.status = false;
                }
            }
        }
        //adding points to that shop points field if it is a special item
        if (itemObjFromInventory.isSpecial == true) {
            let points = itemObjFromInventory.points;
            shop.pendingPoints += points;
        }
    }
    //adding the grandtotal to the revenue field of the shop
    shop.revenue += bill.grandTotal;
    let updatedShopDetails = yield shop_service_1.default.findByIdAndUpdate({ _id: shopId }, { $set: shop });
    let record = yield create(bill);
    return [record, updatedShopDetails];
});
//ADMIN CAN VIEW THE LIST OF ALL BILLS ALONG WITH ALL FILTERS
const viewBills = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, shopId } = query, filter = __rest(query, ["startDate", "endDate", "shopId"]);
    let pipeline = (0, pipeline_1.generatePipeline)(filter);
    const aggregate = [];
    if (query.startDate) {
        aggregate.push({
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        });
    }
    if (query.shopId) {
        aggregate.push({
            $group: {
                _id: new mongoose_1.Types.ObjectId(query.shopId),
                totalRevenue: { $sum: "$grandTotal" }
            },
        });
    }
    const pipe = [
        ...aggregate,
        ...pipeline
    ];
    const result = yield sales_repo_1.default.find(pipe);
    return result;
});
//DELETE SALE BY SHOP-OWNER
const deleteSale = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const billDocument = yield sales_repo_1.default.findOne({ _id: reqId });
    if (!billDocument)
        throw "Bill not found";
    const shop = yield shop_service_1.default.findOne({ _id: billDocument.shopId });
    if (!shop)
        shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    yield sales_repo_1.default.updateOne({ _id: reqId }, {
        $set: {
            isDeleted: true
        }
    });
    for (let item of billDocument.itemsPurchased) {
        yield shop_service_1.default.updateOne({
            _id: billDocument.shopId,
            "inventory.itemId": item.itemId
        }, {
            $inc: {
                "inventory.$.qty": item.soldQty
            }
        });
        const inventoryObject = yield inventory_service_1.default.findOne({ _id: item.itemId });
        yield shop_service_1.default.updateOne({
            _id: billDocument.shopId,
            "inventory.itemId": item.itemId,
            "inventory.qty": {
                $gte: inventoryObject.minLimit
            }
        }, {
            $set: {
                "inventory.$.status": true
            }
        });
    }
    return shop;
});
//ITEM WISE HIGHEST SELLER 
const itemWiseHighestSeller = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = generateBill(query);
    const aggregate = [];
    aggregate.push({ $unwind: "$itemsPurchased" }, Object.assign({ $group: {
            _id: "$itemsPurchased.itemId",
            TotalSoldQty: { $sum: "$itemsPurchased.soldQty" }
        } }, pipeline));
    return yield sales_repo_1.default.find(aggregate);
});
exports.default = {
    create,
    generateBill,
    viewBills,
    deleteSale,
    itemWiseHighestSeller
};
