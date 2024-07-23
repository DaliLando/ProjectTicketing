const express = require ("express");
const {newTicket,cancelTicket, getTicket} = require ("../handlers/ticketHandler");
const { isAuth } = require("../middlewares/isAuth");

let ticketRouter = express.Router()

ticketRouter.post ("/newticket/:id",isAuth,newTicket)
ticketRouter.put ("/cancelticket/:id",isAuth,cancelTicket)
ticketRouter.get("/findticket/:id",isAuth,getTicket)

module.exports = ticketRouter