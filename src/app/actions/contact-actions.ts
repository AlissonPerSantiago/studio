
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

  console.log("--- Variáveis de ambiente SMTP DENTRO DA ACTION ---");
  console.log("SMTP_HOST:", process.env.SMTP_HOST ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_PORT:", process.env.SMTP_PORT ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_USER:", process.env.SMTP_USER ? "Definido" : "NÃO DEFINIDO");
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Definido (comprimento: " + (process.env.SMTP_PASS?.length || 0) + ")" : "NÃO DEFINIDO");
  console.log("EMAIL_TO:", process.env.EMAIL_TO ? "Definido" : "NÃO DEFINIDO");

  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('--- ERRO DE VALIDAÇÃO NA ACTION ---:', validationResult.error.flatten());
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique o formulário.',
    };
  }
  console.log("--- VALIDAÇÃO DOS DADOS OK ---");

  const { name, email, message } = validationResult.data;

  try {
    console.log("--- ANTES DE CHAMAR improveContactFormPrompt (CHAMADA COMENTADA) ---");
    // const improveInput: ImproveContactFormPromptInput = {
    //   submissionText: message,
    // };
    // const improvedResult = await improveContactFormPrompt(improveInput);
    // const improvedMessage = improvedResult.improvedText;
    const improvedMessage = message + " (IA desativada para teste)"; // Simulação
    console.log("--- DEPOIS DE CHAMAR improveContactFormPrompt (CHAMADA COMENTADA) ---");
    console.log('Mensagem Original:', message);
    console.log('Mensagem (Simulada) Melhorada:', improvedMessage);

    // Temporariamente desabilitar envio de e-mail para focar nos logs
    console.log("--- ANTES DE CONFIGURAR Nodemailer Transporter (BLOCO COMENTADO) ---");
    /*
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
    });

    console.log("--- ANTES DE CHAMAR transporter.sendMail (BLOCO COMENTADO) ---");
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO,
      subject: `Nova mensagem de contato de ${name} (VATEC Automação - TESTE DEBUG)`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem Original:\n${message}\n\nMensagem (Simulada) Melhorada:\n${improvedMessage}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <p><strong>Mensagem Original:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Mensagem (Simulada) Melhorada:</strong></p>
        <p>${improvedMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('--- DEPOIS DE CHAMAR transporter.sendMail (BLOCO COMENTADO) --- E-mail enviado com sucesso para:', process.env.EMAIL_TO);
    */

    console.log("--- SIMULAÇÃO DE ENVIO DE E-MAIL CONCLUÍDA (CÓDIGO DE ENVIO REAL COMENTADO) ---");

    return {
      success: true,
      message: 'Sua mensagem foi processada (envio de e-mail desativado para teste).',
    };

  } catch (error: any) {
    console.error('--- ERRO DETALHADO NO CATCH da Server Action ---');
    console.error('Mensagem do Erro:', error.message);
    console.error('Código do Erro (se houver):', error.code);
    console.error('Nome do Erro:', error.name);
    console.error('Stack Trace:', error.stack);
    console.error('Objeto de Erro Completo:', JSON.stringify(error, null, 2));

    let errorMessage = 'Ocorreu um erro ao processar sua mensagem (debug). Tente novamente mais tarde.';
    // Não exponha detalhes do erro diretamente ao cliente em produção por segurança
    // errorMessage += ` Detalhe: ${error.message}`;

    return {
      success: false,
      error: errorMessage,
    };
  }
}
