
exports.sendMailer = (optionsTransporterMail = OptionsTransporterMail, optionsMail = OptionsMail, callback) => {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport(optionsTransporterMail);

    transporter.sendMail(optionsMail, function (err, info) {
        callback(err, info)
    });
}