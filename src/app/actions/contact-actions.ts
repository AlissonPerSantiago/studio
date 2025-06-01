
'use server';

import { z } from 'zod';
import { improveContactFormPrompt, type ImproveContactFormPromptInput } from '@/ai/flows/improve-contact-form-prompt';
import type { ContactFormData } from '@/components/forms/contact-form';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }).max(500, { message: "A mensagem não pode exceder 500 caracteres." }),
});

interface SubmitContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResponse> {
  console.log("Recebida submissão do formulário de contato:", data.email);

  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Erro de validação na action de contato:', validationResult.error.flatten());
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique o formulário e tente novamente.',
    };
  }

  const { name, email, message } = validationResult.data;
  let improvedMessage = message; // Usar mensagem original como fallback

  try {
    console.log("Tentando melhorar a mensagem com IA...");
    const improveInput: ImproveContactFormPromptInput = {
      submissionText: message,
    };
    const improvedResult = await improveContactFormPrompt(improveInput);
    improvedMessage = improvedResult.improvedText;
    console.log('Mensagem original:', message);
    console.log('Mensagem melhorada pela IA:', improvedMessage);
  } catch (aiError: any) {
    console.error("Erro ao tentar melhorar a mensagem com IA:", aiError.message);
    // Continuar com a mensagem original se a IA falhar
  }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.EMAIL_TO
  ) {
    console.error("Erro Crítico: Variáveis de ambiente SMTP não configuradas corretamente.");
    return {
      success: false,
      error: "O servidor não está configurado para enviar e-mails. Por favor, contate o administrador.",
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true para porta 465 (SSL), false para outras (como 587 para STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // tls: { // Descomente e use com cautela se o servidor SMTP tiver certificado auto-assinado
    //   rejectUnauthorized: false
    // }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`, // O e-mail do remetente deve ser o mesmo autenticado
    replyTo: email,
    to: process.env.EMAIL_TO, // E-mail que receberá as mensagens
    subject: `Nova mensagem de contato de ${name} (VATEC Automação)`,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem Original:\n${message}\n\nMensagem Melhorada pela IA:\n${improvedMessage}`,
    html: `
      <h3>Nova Mensagem de Contato</h3>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <h4>Mensagem Original:</h4>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <h4>Mensagem Melhorada pela IA:</h4>
      <p>${improvedMessage.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    console.log(`Tentando enviar e-mail para ${process.env.EMAIL_TO}...`);
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso para:', process.env.EMAIL_TO);
    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso! Responderemos em breve.',
    };
  } catch (emailError: any) {
    console.error('Erro detalhado ao enviar e-mail com Nodemailer:');
    console.error('Mensagem do Erro:', emailError.message);
    console.error('Código do Erro (se houver):', emailError.code);
    console.error('Nome do Erro:', emailError.name);
    // Não logar o stack trace completo em produção, a menos que necessário para depuração específica.
    // console.error('Stack Trace:', emailError.stack);
    
    // Exemplo de como tratar códigos de erro comuns do Nodemailer
    let userErrorMessage = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.';
    if (emailError.code === 'EAUTH') {
      userErrorMessage = 'Falha na autenticação com o servidor de e-mail. Verifique as credenciais.';
      // Em produção, você não mostraria "Verifique as credenciais" ao usuário, mas logaria isso para o admin.
    } else if (emailError.code === 'ECONNREFUSED') {
      userErrorMessage = 'Não foi possível conectar ao servidor de e-mail.';
    }

    return {
      success: false,
      error: userErrorMessage,
    };
  }
}
