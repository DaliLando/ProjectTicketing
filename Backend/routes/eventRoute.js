const express = require ("express");
const {newEvent,updateEvent,deleteEvent, getAllEvents, findCategory, findEvent} = require ("../handlers/eventHandler")
const {isAdmin} = require ("../middlewares/isAdmin");

let eventRouter = express.Router();

eventRouter.post('/newevent',isAdmin,newEvent)
eventRouter.put('/update/:id',isAdmin,updateEvent)
eventRouter.delete('/delete/:id',isAdmin,deleteEvent)
eventRouter.get('/getevents',isAdmin,getAllEvents)
eventRouter.get('/category/:category',findCategory)
eventRouter.get('/findevent/:id',isAdmin,findEvent)


module.exports = eventRouter