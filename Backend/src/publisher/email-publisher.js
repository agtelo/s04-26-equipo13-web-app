const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function publishEmail(to, subject, content){

    const recipients = Array.isArray(to) ? to : [to];

    const { data, error } = await resend.emails.send({
        from: 'TalentCircle <onboarding@luidev.online>',
        to: recipients,
        subject: subject || 'TalentCircle Newsletter Semanal',
        html: content
    });

    if(error) throw new Error(error.message);
    return data;
}

module.exports = { publishEmail };