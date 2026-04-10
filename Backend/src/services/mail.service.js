import nodeMailer from "nodemailer"

const gmailUser = process.env.GMAIL_USER 
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD


const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailUser,
        pass: gmailAppPassword
    }
})


if (process.env.NODE_ENV !== "test") {
    transporter.verify().catch((error) => {
        console.error("Gmail SMTP transporter verification failed:", error.message)
    })
}


const sendRegisterEmail = async ({to, subject, html}) =>{
    if (!gmailUser || !gmailAppPassword) {
        throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables")
    }

    const mailOptions = {
        from: gmailUser,
        to,
        subject,
        html
    }

    const details = await transporter.sendMail(mailOptions)
}

export default sendRegisterEmail