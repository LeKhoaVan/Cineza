const { getAllTicketService,
    getTicketByCodeService,
    getTicketByShowingService,
    createTicketService,
    checkSeatBook,
    getAllSeatIsBookService } = require("../services/ticketService")

const getAllTicketController = async (req, res) => {
    try {
        const allTicket = await getAllTicketService();
        res.status(200).send(allTicket)
    } catch (error) {
        res.status(500).send("error get all ticket: " + error);
    }
}

const getTicketByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const ticket = await getTicketByCodeService(code);
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send("error get ticket by code: " + error);
    }
}

const createTicketController = async (req, res) => {
    const { codeShowing, codeSeat, status } = req.body
    try {
        // check is book
        const checkBook = await checkSeatBook(codeSeat, codeShowing);
        if (checkBook == null) {
            // checkTicketQuanlityService
            const checkQuanlity = await getTicketByShowingService(codeShowing);
            if (checkQuanlity.length <= 36) {
                // createTicketService
                const newTicket = await createTicketService({ codeShowing, codeSeat, status });
                res.status(201).send(newTicket);
            } else {
                res.status(400).send("Ghế đầy");
            }
        } else {
            res.status(400).send("Ghế đã được đặt")
        }

    } catch (error) {
        res.status(500).send("error create new a ticket: " + error);
    }
}

const getTicketByShowingController = async (req, res) => {
    const { codeShowing } = req.params;
    try {
        // getTicketByShowingService
        const tickets = await getTicketByShowingService(codeShowing);
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send("error get ticket by showing: " + error);
    }
}

const getSeatIsBookController = async (req, res) => {
    const { codeShowing } = req.params;
    try {
        const seats = await getAllSeatIsBookService(codeShowing);
        res.status(200).send(seats);
    } catch (error) {
        res.status(500).send("error get seat is book: " + error)
    }
}

module.exports = {
    getAllTicketController,
    getTicketByCodeController,
    createTicketController,
    getTicketByShowingController,
    getSeatIsBookController
}