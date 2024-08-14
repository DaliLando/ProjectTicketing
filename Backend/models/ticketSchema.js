const mongoose = require ("mongoose");
 

const ticket = new mongoose.Schema({
   event:{
    type :mongoose.Schema.Types.ObjectId,
     ref:'Event',
      required:true
   },
   user:{
    type : mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
   },
   isBooked: {
     type: Boolean, 
     default: true 
    },
    seatType : String
    
    
});
module.exports = mongoose.model('Ticket', ticket);
