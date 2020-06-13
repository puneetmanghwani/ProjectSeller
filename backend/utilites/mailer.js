var nodemailer = require('nodemailer');

var mailer =(receiver,Projects)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vritiemailtesting@gmail.com',
          pass: 'Django123@'
        }
      });
      var order = Projects.reduce((prev,next) => prev + next.quantity+' '+next.title+' ,','')
      var content = "Your order for "+order+" "+"is placed";
      var mailOptions = {
        from: 'vritiemailtesting@gmail.com',
        to: receiver,
        subject: 'Order Placed',
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = mailer;