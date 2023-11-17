const { createOrderService } = require("../services/orderService");

const createOrderController = async (req, res) => {
    try {
        const { codeTicket, codeUser, description, status } = req.body;
        const datePay = new Date();
        const newOrder = await createOrderService({ datePay, codeUser, description, status }, { codeTicket })
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(200).send("save order fail")
        console.log("error save order: " + error);
    }
}

module.exports = { createOrderController }