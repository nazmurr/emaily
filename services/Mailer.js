const sendgridd = require('@sendgrid/mail');
const sendgrid = require('@sendgrid/helpers');
const keys = require('../config/keys');

class Mailer extends sendgrid.classes.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgridd(keys.sendGridKey);
        this.from_email = new sendgrid.Email('me@nazmur.io');
        this.subject = subject;
        this.body = new sendgrid.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new sendgrid.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new sendgrid.TrackingSettings();
        const clickTracking = new sendgrid.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new sendgrid.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;