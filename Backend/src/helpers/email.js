const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetEmail = async (to, resetToken) => {

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    const { data, error } = await resend.emails.send({

        from: 'TalentCircle <onboarding@resend.dev>',
        to: [to],
        subject: 'Restablecer tu contraseña - TalentCircle',
        html: `
            <h2>Restablecer contraseña</h2>
            <p>Recibiste este email porque solicitaste restablecer tu contraseña en TalentCircle.</p>
            <p>Hacé click en el siguiente enlace para crear una nueva contraseña:</p>
            <a href="${resetUrl}"
               style="display:inline-block;padding:12px 24px;background:#6366f1;color:#fff;text-decoration:none;border-radius:6px;">
                Restablecer contraseña
            </a>
            <p>Este enlace expira en 15 minutos.</p>
            <p>Si no solicitaste esto, ignorá este email.</p>
        `
    });

    if (error) throw new Error(error.message);
    return data;
};

module.exports = { sendResetEmail };