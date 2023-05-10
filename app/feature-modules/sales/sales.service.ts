import salesRepo from "./sales.repo";
import { ISale } from "./sales.type";
import inventoryService from "../inventory/inventory.service";
import shopService from "../shops/shop.service";
import { SHOP_RESPONSES } from "../shops/shop-response";
import { PipelineStage, Types } from "mongoose";
import { ObjectId } from 'bson';
import { generatePipeline } from "../../utility/pipeline";

const create = (bill: ISale) => salesRepo.create(bill);

const generateBill = async (bill: ISale) => {
    bill.grandTotal = 0;
    const shopId = bill.shopId;
    const shop = await shopService.findOne({ _id: shopId });
    if (!shop) throw SHOP_RESPONSES.SHOP_NOT_FOUND;

    for (let item of bill.itemsPurchased) {
        const itemId = item.itemId;
        const itemObjFromInventory = await inventoryService.findOne({ _id: itemId });
        const price = itemObjFromInventory.price;
        const qty = item.soldQty;
        item.subTotal = (price * qty);
        bill.grandTotal += item.subTotal;

        //reducing the quantity of that item from shop inventory in local inventory object
        const itemObjFromShop = await shopService.findItem(shopId, itemId);
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

    let updatedShopDetails = await shopService.findByIdAndUpdate({ _id: shopId }, { $set: shop });
    let record = await create(bill);
    return [record, updatedShopDetails];
}

//ADMIN CAN VIEW THE LIST OF ALL BILLS ALONG WITH ALL FILTERS
const viewBills = async (query: any) => {
    const { startDate, endDate, shopId, ...filter } = query
    let pipeline = generatePipeline(filter)
    const aggregate = []
    if (query.startDate) {
        aggregate.push({
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        })
    }
    if (query.shopId) {
        aggregate.push({
            $group: {
                _id: new Types.ObjectId(query.shopId),
                totalRevenue: { $sum: "$grandTotal" }
            },
        })

    }
    const pipe = [
        ...aggregate,
        ...pipeline
    ]

    const result = await salesRepo.find(pipe);

    return result;
}

//DELETE SALE BY SHOP-OWNER
const deleteSale = async (reqId: ObjectId) => {
    const billDocument = await salesRepo.findOne({ _id: reqId })
    if (!billDocument) throw "Bill not found";

    const shop = await shopService.findOne({ _id: billDocument.shopId });
    if (!shop) SHOP_RESPONSES.SHOP_NOT_FOUND;

    await salesRepo.updateOne(
        { _id: reqId },
        {
            $set: {
                isDeleted: true
            }
        }
    )

    for (let item of billDocument.itemsPurchased) {
        await shopService.updateOne(
            {
                _id: billDocument.shopId,
                "inventory.itemId": item.itemId
            },
            {
                $inc: {
                    "inventory.$.qty": item.soldQty
                }
            }
        )
        const inventoryObject = await inventoryService.findOne({ _id: item.itemId });
        await shopService.updateOne(
            {
                _id: billDocument.shopId,
                "inventory.itemId": item.itemId,
                "inventory.qty": {
                    $gte: inventoryObject.minLimit
                }
            },
            {
                $set: {
                    "inventory.$.status": true
                }
            }
        )
    }
    return shop;

}


//ITEM WISE HIGHEST SELLER 
const itemWiseHighestSeller = async (query: any) => {
    const pipeline = generateBill(query);

    const aggregate = [];

    aggregate.push(
        { $unwind: "$itemsPurchased" }, {
        $group: {
            _id: "$itemsPurchased.itemId",
            TotalSoldQty: { $sum: "$itemsPurchased.soldQty" }
        },
        ...pipeline
    })

    return await salesRepo.find(aggregate);
}

export default {
    create,
    generateBill,
    viewBills,
    deleteSale,
    itemWiseHighestSeller
}