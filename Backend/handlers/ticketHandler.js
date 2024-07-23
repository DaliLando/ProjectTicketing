const ticketSchema = require ("../models/ticketSchema")
const eventSchema = require("../models/eventSchema")

exports.newTicket = async (req,res)=> { 
    let {price, type} = req.body;
    let  user= req.user;
    let {id}= req.params
  // console.log(user);
  try {
   
   let nvTicket = new ticketSchema({event:id,user:user._id})
   
   let currentEvent = await eventSchema.findById(id)
   
     let totalTickets = currentEvent.ticketsAvailable.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0,
    );
     if (totalTickets===0){ 
      await ticketSchema.findByIdAndUpdate(id,{isActive:false},{new:true})
  
     } else {
      await nvTicket.save();

      let dec = await eventSchema.findOneAndUpdate({_id:id ,"ticketsAvailable.catType": type },
        { $push: { soldTickets: nvTicket._id  },$inc: { "ticketsAvailable.$.quantity": -1 } },
        {new:true})
      
       res.status(200).json({msg:"Ticket booked successfully",nvTicket,dec}) 
     }
    

  

  } catch (error) {
    console.log(error);
    res.status(500).json({msg:" Server error occured"})
  }
}

exports.cancelTicket = async(req,res)=> {
    let {id} = req.params;

    try {
       let result= await ticketSchema.findByIdAndUpdate(id,{isBooked:false},{new:true})
       let inc = await eventSchema.findByIdAndUpdate(result.event,{$inc:{ticketsAvailable:1}},{new:true})
       res.status(200).json({msg:"Ticket cancelled with success"},result,inc)
    } catch (error) {
        res.status(500).json({msg:" Server error occured"})
    }
}

exports.getTicket = async (req,res)=> {
  let {id}=req.params;
  try {
    let found = await ticketSchema.findById(id).populate("event").populate("user");

    let {location} = found.event
    console.log(location);
    if (!found) {
      return res.status (400).json({msg:"no ticket found with this id"})
    }

    res.status(200).json({msg:"ticket found",location})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:" Server error occured"})
  }
}
