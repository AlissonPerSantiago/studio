
'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres.").max(500, "A mensagem não pode exceder 500 caracteres."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface SubmitContactFormResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResponse> {
  const parsedData = contactFormSchema.safeParse(data);
  if (!parsedData.success) {
    // Extract specific error messages if needed, or a generic one
    const firstError = parsedData.error.errors[0]?.message || "Dados inválidos.";
    return { success: false, message: firstError };
  }

  const { name, email, message } = parsedData.data;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) {
    console.error("Variáveis de ambiente SMTP não configuradas.");
    return { success: false, message: "Erro de configuração do servidor. Tente mais tarde." };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // Se o seu servidor SMTP tiver um certificado SSL/TLS autoassinado ou inválido,
    // você pode precisar adicionar o seguinte. Use com cautela em produção.
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  const mailOptions = {
    // É uma boa prática usar o email autenticado (SMTP_USER) como remetente 'from'
    // e colocar o email do usuário no campo 'replyTo'. Alguns provedores podem marcar
    // como spam se o 'from' for um email não autenticado pelo servidor.
    from: `"${name} via Site" <${SMTP_USER}>`,
    replyTo: email,
    to: EMAIL_TO, // O email que receberá a mensagem
    subject: `Nova mensagem de contato de ${name}`,
    text: `Você recebeu uma nova mensagem do formulário de contato do site:\n\nNome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    html: `
      <h2>Nova mensagem do formulário de contato</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mensagem enviada com sucesso! Responderemos em breve." };
  } catch (error) {
    console.error("Erro ao enviar email via Nodemailer:", error);
    // Não exponha detalhes do erro ao cliente por segurança.
    return { success: false, message: "Falha ao enviar mensagem. Por favor, tente novamente mais tarde." };
  }
}
