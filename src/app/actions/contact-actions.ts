
'use server';

import { z } from 'zod';
// import { improveContactFormPrompt, type ImproveContactFormPromptInput } from '@/ai/flows/improve-contact-form-prompt'; // Removido
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
  console.log("--- submitContactForm ACTION INICIADA ---");
  console.log("--- DADOS RECEBIDOS PELA ACTION ---", data);

  console.log("--- VERIFICANDO VARIÁVEIS DE AMBIENTE ---");
  console.log("SMTP_HOST:", process.env.SMTP_HOST ? 'Definido' : 'NÃO DEFINIDO');
  console.log("SMTP_PORT:", process.env.SMTP_PORT ? 'Definido' : 'NÃO DEFINIDO');
  console.log("SMTP_USER:", process.env.SMTP_USER ? 'Definido' : 'NÃO DEFINIDO');
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? 'Definido (comprimento: ' + (process.env.SMTP_PASS?.length || 0) + ')' : 'NÃO DEFINIDO');
  console.log("EMAIL_TO:", process.env.EMAIL_TO ? 'Definido' : 'NÃO DEFINIDO');
  console.log("--- FIM DA VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE ---");


  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('--- ERRO DE VALIDAÇÃO NA ACTION DE CONTATO ---:', validationResult.error.flatten());
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique o formulário e tente novamente.',
    };
  }
  console.log("--- VALIDAÇÃO DOS DADOS OK ---");

  const { name, email, message } = validationResult.data;
  // let improvedMessage = message; // Removido - Usaremos apenas a mensagem original

  // Removida a lógica de melhoria de IA
  // try {
  //   console.log("--- TENTANDO MELHORAR A MENSAGEM COM IA (LÓGICA COMENTADA/REMOVIDA) ---");
  //   const improveInput: ImproveContactFormPromptInput = {
  //     submissionText: message,
  //   };
  //   const improvedResult = await improveContactFormPrompt(improveInput);
  //   improvedMessage = improvedResult.improvedText;
  //   console.log('Mensagem original:', message);
  //   console.log('Mensagem melhorada pela IA:', improvedMessage);
  //   console.log("--- MELHORIA DA MENSAGEM COM IA CONCLUÍDA ---");
  // } catch (aiError: any) {
  //   console.error("--- ERRO AO TENTAR MELHORAR A MENSAGEM COM IA ---:", aiError.message);
  //   // Continuar com a mensagem original se a IA falhar
  // }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.EMAIL_TO
  ) {
    console.error("--- ERRO CRÍTICO: Variáveis de ambiente SMTP não configuradas corretamente. ---");
    return {
      success: false,
      error: "O servidor não está configurado para enviar e-mails. Por favor, contate o administrador.",
    };
  }
  console.log("--- VARIÁVEIS DE AMBIENTE SMTP VERIFICADAS ---");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // debug: false, // Removido para produção
    // logger: false, // Removido para produção
    // tls: {
    //   rejectUnauthorized: false
    // }
  });
  console.log("--- TRANSPORTER NODEMAILER CRIADO ---");

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `Nova mensagem de contato de ${name} (VATEC Automação)`,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    html: `
      <h3>Nova Mensagem de Contato</h3>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <h4>Mensagem:</h4>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };
  console.log("--- MAILOPTIONS DEFINIDOS ---", mailOptions.subject);

  try {
    console.log(`--- TENTANDO ENVIAR E-MAIL PARA ${process.env.EMAIL_TO}... ---`);
    await transporter.sendMail(mailOptions);
    console.log('--- E-MAIL ENVIADO COM SUCESSO PARA: ---', process.env.EMAIL_TO);
    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso! Responderemos em breve.',
    };
  } catch (emailError: any) {
    console.error('--- ERRO DETALHADO AO ENVIAR E-MAIL COM NODEMAILER: ---');
    console.error('Mensagem do Erro:', emailError.message);
    console.error('Código do Erro (se houver):', emailError.code);
    console.error('Nome do Erro:', emailError.name);
    
    let userErrorMessage = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.';
    if (emailError.code === 'EAUTH') {
      userErrorMessage = 'Falha na autenticação com o servidor de e-mail. Verifique as credenciais.';
    } else if (emailError.code === 'ECONNREFUSED') {
      userErrorMessage = 'Não foi possível conectar ao servidor de e-mail.';
    } else if (emailError.code === 'EENVELOPE') {
        userErrorMessage = 'Problema com os endereços de e-mail (remetente/destinatário). Verifique-os.';
    } else if (emailError.code) { // Outros códigos de erro específicos
        userErrorMessage = `Erro no servidor de e-mail (${emailError.code}). Tente mais tarde.`;
    }


    return {
      success: false,
      error: userErrorMessage,
    };
  }
}
