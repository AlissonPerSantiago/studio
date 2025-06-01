
'use server';

import { z } from 'zod';
import { improveContactFormPrompt, type ImproveContactFormPromptInput } from '@/ai/flows/improve-contact-form-prompt';
import type { ContactFormData } from '@/components/forms/contact-form';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

interface SubmitContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResponse> {
  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Validation Error:', validationResult.error.flatten());
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique o formulário.',
    };
  }

  const { name, email, message } = validationResult.data;

  try {
    // Melhorar a mensagem usando o flow Genkit
    const improveInput: ImproveContactFormPromptInput = {
      submissionText: message,
    };
    const improvedResult = await improveContactFormPrompt(improveInput);
    const improvedMessage = improvedResult.improvedText;

    // Log da mensagem original e melhorada no servidor
    console.log('--- Nova Mensagem de Contato Recebida ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Mensagem Original:', message);
    console.log('Mensagem Melhorada pela IA:', improvedMessage);
    console.log('----------------------------------------');

    // Configurar Nodemailer
    // É CRUCIAL que estas variáveis de ambiente estejam definidas no seu ambiente de produção
    // e no seu arquivo .env ou .env.local para desenvolvimento.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true para porta 465, false para outras
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Habilita logs de debug do nodemailer
      logger: true // Garante que os logs de debug sejam enviados para o console
      // Opção para permitir certificados auto-assinados (use com cautela e apenas se necessário)
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    console.log('Tentando enviar e-mail com as seguintes configurações:');
    console.log('Host:', process.env.SMTP_HOST);
    console.log('Porta:', process.env.SMTP_PORT);
    console.log('Usuário SMTP:', process.env.SMTP_USER ? '******' : 'NÃO DEFINIDO'); // Não logar o usuário real, apenas se está definido


    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Use o e-mail configurado no SMTP_USER
      replyTo: email, // E-mail do usuário que preencheu o formulário
      to: process.env.EMAIL_TO, // Para quem o e-mail será enviado (você)
      subject: `Nova mensagem de contato de ${name} (VATEC Automação)`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem Original:\n${message}\n\nMensagem Melhorada pela IA:\n${improvedMessage}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <p><strong>Mensagem Original:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Mensagem Melhorada pela IA:</strong></p>
        <p>${improvedMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso para:', process.env.EMAIL_TO);

    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso!',
    };
  } catch (error) {
    console.error('--- FALHA NO ENVIO DO E-MAIL ---');
    console.error('Erro completo:', error); // Loga o objeto de erro completo

    if (typeof error === 'object' && error !== null) {
      const nodemailerError = error as any;
      if (nodemailerError.code) {
        console.error('Código do erro Nodemailer:', nodemailerError.code);
      }
      if (nodemailerError.response) {
        console.error('Resposta do servidor SMTP:', nodemailerError.response);
      }
      if (nodemailerError.responseCode) {
        console.error('Código de resposta SMTP:', nodemailerError.responseCode);
      }
      if (nodemailerError.command) {
        console.error('Comando SMTP com falha:', nodemailerError.command);
      }
    }
    
    let errorMessage = 'Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
