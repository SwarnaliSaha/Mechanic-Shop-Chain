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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../../utility/middlewares");
const response_handler_1 = require("../../utility/response-handler");
const inventory_service_1 = __importDefault(require("./inventory.service"));
const express_1 = require("express");
const inventory_validation_1 = require("./inventory.validation");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//ADMIN CAN ADD A NEW ITEM TO THE INVENTORY LIST
router.post("/AddItem", (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), inventory_validation_1.ADD_ITEM_VALIDATOR, (req, res, next) => {
    try {
        const newItem = req.body;
        const result = inventory_service_1.default.addItem(newItem);
        res.send("New item added successfully to the inventory list");
    }
    catch (error) {
        next(error);
    }
});
//ADMIN CAN UPDATE ANY PRODUCT FROM THE INVENTORY LIST
router.patch('/UpdateItem/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), inventory_validation_1.UPDATE_ITEM_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedObject = req.body;
    const itemToUpdate = req.params.id;
    const result = yield inventory_service_1.default.findByIdAndUpdate({ _id: itemToUpdate }, { $set: updatedObject });
    res.send("Item updated successfully");
}));
//ADMIN CAN DELETE ANY PRODUCT FROM THE INVENTORY LIST
router.delete('/DeleteItem/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), inventory_validation_1.DELETE_ITEM_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemToBeDeleted = req.params.id;
    const result = yield inventory_service_1.default.findByIdAndUpdate({ _id: itemToBeDeleted }, { isDeleted: true });
    res.send("item deleted successfully");
}));
//ADMIN CAN VIEW THE FULL LIST OF PRODUCTS
router.get('/ViewAllProducts', (0, middlewares_1.validateRole)(["643eb96fc8f5f358c3db8d0f"]), inventory_validation_1.VIEW_PRODUCT_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield inventory_service_1.default.ViewAllProducts(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
//ADMIN CAN VIEW A PARTICULAR PRODUCT FROM INVENTORY
// router.get('/ViewProduct/:productId',validateRole(["643eb96fc8f5f358c3db8d0f"]),VIEW_PRODUCT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const result = await inventoryService.findOne({_id:new Types.ObjectId(req.params.productId)});
//         res.send(new ResponseHandler(result))
//     }
//     catch(e){
//         next(e);
//     }
// })
exports.default = router;
