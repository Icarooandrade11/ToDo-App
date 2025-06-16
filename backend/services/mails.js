const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envia e‑mail com link de redefinição de senha
 * @param {string} to    E‑mail de destino
 * @param {string} token Token JWT gerado
 */
async function sendResetEmail(to, token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: `"ToDo App" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Redefinição de senha – ToDo App',
    html: `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; padding:20px; background:#f9f9f9; border-radius:8px;">
        <h2 style="color:#333;">Redefinição de senha</h2>
        <p>Você solicitou a redefinição de senha. Clique no botão abaixo:</p>
        <a href="${resetLink}" style="display:inline-block; padding:12px 20px; background:#4f46e5; color:#fff; text-decoration:none; border-radius:4px;">Redefinir senha</a>
        <p style="font-size:12px; color:#666; margin-top:20px;">Link válido por 1 hora.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

// **AQUI** fazemos a exportação correta
module.exports = { sendResetEmail };