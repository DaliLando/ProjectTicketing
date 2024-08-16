const ticketSchema = require("../models/ticketSchema");
const eventSchema = require("../models/eventSchema");
const { mailer } = require("./mailer");

exports.newTicket = async (req, res) => {
  const { valid, valeur } = req.body;
  const user = req.user;
  const { id } = req.params;
 console.log(id);
 
  try {
    const currentEvent = await eventSchema.findById(id);
    if (!currentEvent) {
      return res.status(400).json({ msg: "No event found with this ID" });
    }

    const totalTickets = currentEvent.ticketsAvailable.reduce(
      (acc, ticket) => acc + ticket.quantity,
      0
    );

   
    
    const nvTicket = new ticketSchema({ event: id, user: user._id,seatType:valeur });
    // console.log(nvTicket);
    
    if (totalTickets === 0) {
      await currentEvent.updateOne({ isActive: false });
      return res.status(400).json({ msg: "Ticket stock is empty now :(" });
    }

    if (valid === true) {
      const updateResult = await eventSchema.updateOne(
        { "ticketsAvailable": { "$elemMatch": { "catType": valeur, "quantity":{$gt :0} } }, _id :id },
        {
          $inc: { "ticketsAvailable.$.quantity": -1,"nbrSold.$[elem].quantity":1 },
          $push: { soldTickets: nvTicket._id },
          // $set:{"nbrSold.$.seatType":valeur}

          
        }
        ,
          {arrayFilters:  [{ "elem.seatType": valeur}] }
      );


      if (updateResult.modifiedCount === 0) {
        return res.status(400).json({ msg: "Tickets are all sold" });
      }

     
      await nvTicket.save();
      res.status(200).json({ msg: "Ticket booked successfully", doc: updateResult });
      const bought = `
        <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 10px;
              text-align: center;
            }
            .content {
              margin: 20px 0;
            }
            .footer {
              background-color: #4CAF50;
              color: white;
              padding: 10px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
            </div>
            <div class="content">
              <p>Hello ${user.firstName},</p>
              <p>Thank you for your purchase. Here are the details of your ticket:</p>
              <ul>
                <li>Event: ${currentEvent.name}</li>
                <li>Date: ${currentEvent.date}</li>
                <li> Seat type: ${valeur}</li>
              </ul>
            </div>
            <div class="footer">
              <p>Thank you for choosing our service!</p>
            </div>
          </div>
        </body>
        </html>
      `;

      mailer(user.email,'Booking confirmation',bought)
    } else {
      return res.status(400).json({ msg: "Order not confirmed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

exports.cancelTicket = async (req, res) => {
  const { id } = req.params;
  const {valeur}=req.body
console.log(id);

  try {
    const ticket = await ticketSchema.findByIdAndUpdate(id, { isBooked: false }, { new: true });
    if (!ticket) {
      return res.status(400).json({ msg: "No ticket found with this ID" });
    }

    await eventSchema.updateOne(
      { "ticketsAvailable": { "$elemMatch": { "catType": valeur, "quantity":{$gt :0} } }, _id :ticket.event },
      {
        $inc: { "ticketsAvailable.$.quantity": 1,"nbrSold.$[elem].quantity":-1 },
        $pull: { soldTickets: id },
        // $set:{"nbrSold.$.seatType":valeur}
        
      },
      {arrayFilters:  [{ "elem.seatType": valeur}] }
    )


    res.status(200).json({ msg: "Ticket cancelled successfully", ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

exports.getTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await ticketSchema.findById(id).populate("event").populate("user");

    if (!ticket) {
      return res.status(400).json({ msg: "No ticket found with this ID" });
    }

    let {seatType} = ticket
    res.status(200).json({ msg: "Ticket found",seatType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

exports.getTicketsByUser = async (req, res) => {
  const user = req.user;

  try {
    const tickets = await ticketSchema.find({ user: user._id }).populate("user").populate("event");

    if (tickets.length === 0) {
      return res.status(400).json({ msg: "This user hasn't booked any tickets" });
    }

    res.status(200).json({ msg: "Tickets booked by user", tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};
