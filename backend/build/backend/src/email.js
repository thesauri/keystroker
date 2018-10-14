"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var db_1 = require("./model/db");
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
            console.error("Unable to send email to " + email + ": " + error);
        }
        console.log("Email sent to " + email + "!");
    });
};
exports.sendLinkToAllParticipants = function () {
    db_1.query("SELECT email FROM Participant;", [])
        .then(function (queryResult) { return queryResult.rows.map(function (row) { return row.email; }); })
        .then(function (emails) { return emails.forEach(sendLinkAndRecordAsSent); });
};
var sendLinkAndRecordAsSent = function (email) {
    exports.sendLink(email);
    db_1.query("INSERT INTO EmailLinkEvent(participant_email) VALUES ($1);", [email])
        .catch(function (error) { return console.error("Unable to add EmailLinkEvent for " + email); });
};
//# sourceMappingURL=email.js.map