import nodemailer from 'nodemailer'

export const sendEmail = async({email,emailType, userId}:any)=>{
    try {
        //TODO: configure mail for ussage

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });


         const mailOPtions = {
            from: 'fusicbeats@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY' ? "Verify your email" : "Reset your password" , // Subject line
            html: "<b>Hello world?</b>", // html body
          }

          const mailResponse = await transporter.sendMail(mailOPtions)
          return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}