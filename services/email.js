const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");

const sendEmail = ({ subject, recipients }, content) => {
  sgMail.setApiKey(keys.sendGridKey);

  const msg = {
    to: recipients,
    from: "Emaily <me@nazmur.io>",
    subject: subject,
    html: content,
  };

  (async () => {
    try {
      await sgMail.sendMultiple(msg);
      console.log("emails sent successfully!");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

module.exports = sendEmail;
