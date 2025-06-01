
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
  console.log("--- submitContactForm ACTION INICIADA ---");
  console.log("--- DADOS RECEBIDOS PELA ACTION ---", JSON.stringify(data, null, 2));

  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Validation Error:', validationResult.error.flatten());
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique o formulário.',
    };
  }

  const { name, email, message } = validationResult.data;
  console.log("--- Variáveis de ambiente SMTP ---");
  console.log("SMTP_HOST:", process.env.SMTP_HOST ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_PORT:", process.env.SMTP_PORT ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_USER:", process.env.SMTP_USER ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Definido (comprimento: " + (process.env.SMTP_PASS?.length || 0) + ")" : "NÃO DEFINIDO");
  console.log("EMAIL_TO:", process.env.EMAIL_TO ? "Definido" : "NÃO DEFINIDO");


  try {
    console.log("--- Tentando melhorar a mensagem com Genkit ---");
    const improveInput: ImproveContactFormPromptInput = {
      submissionText: message,
    };
    const improvedResult = await improveContactFormPrompt(improveInput);
    const improvedMessage = improvedResult.improvedText;

    console.log('--- Nova Mensagem de Contato Recebida (Após IA) ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Mensagem Original:', message);
    console.log('Mensagem Melhorada pela IA:', improvedMessage);
    console.log('----------------------------------------');

    console.log("--- Configurando Nodemailer Transporter ---");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, 
      logger: true, 
      // tls: {
      //   rejectUnauthorized: false // Descomente ESTA LINHA APENAS PARA TESTES E SE NECESSÁRIO
      // }
    });

    console.log("--- Definindo Mail Options ---");
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, 
      replyTo: email, 
      to: process.env.EMAIL_TO, 
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

    console.log("--- Tentando enviar e-mail ---");
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso para:', process.env.EMAIL_TO);

    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso!',
    };
  } catch (error: any) {
    console.error('--- ERRO DETALHADO NO CATCH da Server Action ---');
    console.error('Mensagem do Erro:', error.message);
    console.error('Código do Erro (se houver):', error.code);
    console.error('Resposta do Servidor (se houver):', error.response);
    console.error('Stack Trace:', error.stack);
    console.error('Objeto de Erro Completo:', JSON.stringify(error, null, 2));
    
    let errorMessage = 'Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.';
    // Não exponha detalhes do erro diretamente ao cliente em produção por segurança
    // errorMessage += ` Detalhe: ${error.message}`; 
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}
