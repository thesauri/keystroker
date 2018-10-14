"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "mail.aalto.fi",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
var greetings = [
    "Hi!",
    "Hello!"
];
var bodies = [
    "This is a reminder for logging in to the user authentication study website. To log in, click the following link: <a href=\"https://ua-study.herokuapp.com/login?email=$\">https://ua-study.herokuapp.com/login?email=$</a>"
    // `It's time to log in to the user authentication study website! Follow the link below to log in<br /><a href="https://ua-study.herokuapp.com/login?email=$">https://ua-study.herokuapp.com/login?email=$</a>`
];
var signatures = [
    "Best regards",
    "Cheers"
];
var sample = function (texts) { return texts[Math.floor(texts.length * Math.random())]; };
exports.sendLink = function (email) {
    var messageWithoutEmail = "<p>" + sample(greetings) + "</p>" +
        ("<p>" + sample(bodies) + "</p>") +
        ("<p>" + sample(signatures) + "</p>") +
        "<p>Walter Berggren</p>";
    var message = messageWithoutEmail.replace(/\$/gi, email);
    var mailOptions = {
        from: '"Berggren Walter" <walter.berggren@aalto.fi>',
        to: email,
        subject: "Login reminder—User authentication study",
        html: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Unable to send email: " + error);
        }
        console.log("Email sent!");
    });
};
//# sourceMappingURL=email.js.map