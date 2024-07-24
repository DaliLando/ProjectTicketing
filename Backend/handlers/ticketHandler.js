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
  //  console.log(currentEvent.ticketsAvailable);
     let totalTickets = currentEvent.ticketsAvailable.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0,
    );
     if (totalTickets===0){ 
      await currentEvent.updateOne({$set:{isActive:false}})
  
     } else {
      // await nvTicket.save();

      //  currentEvent.ticketsAvailable.map(async(item)=>{
        for ( let i=0;i<currentEvent.ticketsAvailable.length;i++) {
          if(currentEvent.ticketsAvailable[i].quantity > 0 && currentEvent.ticketsAvailable[i].catType === type){
           await  currentEvent.updateOne(
            {"currentEvent.catType":type},
              { $inc: { "ticketsAvailable.$.quantity": -1 } }
              
             )
            return res.status(200).json({msg:"Ticket booked successfully",nvTicket}) 
            
          } else {
            return res.status(400).json({msg:"wfeeeee"})
          }
        }
        
      
      //  })
      
      
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
