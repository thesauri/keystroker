import nodemailer = require("nodemailer");
import { MailOptions } from "nodemailer/lib/sendmail-transport";

const transporter = nodemailer.createTransport({
    host: "mail.aalto.fi",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const greetings = [
    "Hi!",
    "Hello!"
];

const bodies = [
    `This is a reminder for logging in to the user authentication study website. To log in, click the following link: <a href="https://ua-study.herokuapp.com/login?email=$">https://ua-study.herokuapp.com/login?email=$</a>`
    // `It's time to log in to the user authentication study website! Follow the link below to log in<br /><a href="https://ua-study.herokuapp.com/login?email=$">https://ua-study.herokuapp.com/login?email=$</a>`
];

const signatures = [
    `Best regards`,
    `Cheers`
];

const sample = (texts: string[]): string => texts[Math.floor(texts.length * Math.random())];

export const sendLink = (email: string) => {
    const messageWithoutEmail =
        `<p>${sample(greetings)}</p>` +
        `<p>${sample(bodies)}</p>` +
        `<p>${sample(signatures)}</p>` +
        `<p>Walter Berggren</p>`;
    const message = messageWithoutEmail.replace(/\$/gi, email);

    const mailOptions: MailOptions = {
        from: '"Berggren Walter" <walter.berggren@aalto.fi>',
        to: email,
        subject: "Login reminder—User authentication study",
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Unable to send email: ${error}`);
        }
        console.log(`Email sent!`);
    });
};

