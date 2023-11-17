const { db } = require("../models/index");

const createOrderService = async (order, codeTicket) => {
    const newOrder = await db.Order.create(order);
    let checkSaveOrderDetail = true
    console.log(codeTicket.codeTicket)
    codeTicket.codeTicket.forEach(async ct => {
        const orderDetail = { codeOder: newOrder.code, codeTicket: ct.codeTicket }
        console.log(orderDetail)
        const newOrderDetail = await db.OrderDetail.create(orderDetail)
        if (newOrderDetail != undefined) {
            checkSaveOrderDetail = false;
        }
    })
    if (checkSaveOrderDetail) {
        return newOrder;
    }
    return null;
}

module.exports = { createOrderService };