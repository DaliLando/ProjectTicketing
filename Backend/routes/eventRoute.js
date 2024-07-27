const express = require ("express");
const {newEvent,updateEvent,deleteEvent, getAllEvents} = require ("../handlers/eventHandler")
const {isAdmin} = require ("../middlewares/isAdmin");
const { isAuth } = require("../middlewares/isAuth");

let eventRouter = express.Router();

eventRouter.post('/newevent',isAdmin,newEvent)
eventRouter.put('/update/:id',isAdmin,updateEvent)
eventRouter.delete('/delete/:id',isAdmin,deleteEvent)
eventRouter.get('/getevents',getAllEvents)

module.exports = eventRouter