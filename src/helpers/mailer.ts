import nodemailer from 'nodemailer';


export async function sendMail ({email,emailType,userId}:{email:string,emailType:string,userId:string}) {

    try {
        // todo : implement the logic to send email
        
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
                from: 'sayam@gmail.com',
                to: email, 
                subject: emailType === 'VERIFY' ? "Verify your email": "Reset your Password", // Subject line
                html: "<b>Hello world?</b>", // html body
          }
          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error("Error sending email", error);
    }


}