const nodemailer = require('nodemailer');

exports.mailer = (To ,Sub, content)=>{
    const transport = nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: 'kosslimaak@gmail.com',
        pass: process.env.MAILERPSWD
    
      } 
    
    })
    transport.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take our messages:', success);
        }
      });
    const mailOptions = {
        from: 'kosslimaak@gmail.com',
        to: To ,
        subject: Sub,
        html: content
      };
    
    transport.sendMail(mailOptions,(err,info)=>{
        if (err){
            console.log(err);
        } else {
            console.log("mail sent !" + info.response);
        }
    })
    

}

