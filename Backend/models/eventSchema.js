const mongoose = require ("mongoose");

const event = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: String,
    location : { type: String, required: true },
    category : {type:String, enum:["sport","entertainement"]},
    ticketsAvailable: 
      [{
         catType:{
            type:String,
            enum:["vip","seats","standing"]
        },
        quantity:{
          type:Number,
          required:true
        },
        price:{
            type:Number
        }
         }],
    isActive: { type: Boolean, default: true },
    soldTickets : [{type: mongoose.Types.ObjectId, ref:"Ticket"}],
    nbrSold:{
      type:[{
      seatType:{
         type:String,
         enum:["vip","seats","standing"]
     },
     quantity:{
       type:Number,
       required:true
     }
      }],
    default:[{
      seatType:"vip",
      quantity:0
    },{
      seatType:"seats",
      quantity:0
    },{
      seatType:"standing",
      quantity:0
    }]}

})


module.exports = mongoose.model('Event',event)
