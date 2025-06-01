
'use server';

// Este arquivo foi intencionalmente esvaziado.
// A funcionalidade de envio de email foi migrada para o Formspree
// no componente src/components/forms/contact-form.tsx.
// Manter a lógica anterior baseada em Nodemailer aqui pode causar
// "Internal Server Errors" durante o build de um site estático (output: 'export')
// porque Nodemailer e outras dependências do lado do servidor não podem ser executadas
// em um ambiente puramente estático.

// Se você precisar reativar o envio de email via backend no futuro (por exemplo,
// mudando para um ambiente de hospedagem com Node.js), você precisará
// reimplementar a lógica de envio de email aqui e ajustar o formulário de contato
// para chamar esta server action novamente.

/*
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
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name} via Site" <${SMTP_USER}>`,
    replyTo: email,
    to: EMAIL_TO,
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
    return { success: false, message: "Falha ao enviar mensagem. Por favor, tente novamente mais tarde." };
  }
}
*/
