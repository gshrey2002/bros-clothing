const nodeMailer=require("nodemailer");

const sendEmail= async (options)=>{

    const transporter=nodeMailer.createTransport({


        service:process.env.SMTPService,
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        
        auth:{
            user:process.env.SMTPID,
            pass:process.env.SMTPPassword,
        }
    })
    const mailObject={
        from:process.env.SMTPID,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailObject);

};


module.exports=sendEmail;