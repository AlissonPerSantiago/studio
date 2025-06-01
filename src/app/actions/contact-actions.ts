
'use server';

import { z } from 'zod';
import { improveContactFormPrompt, type ImproveContactFormPromptInput } from '@/ai/flows/improve-contact-form-prompt';
import type { ContactFormData } from '@/components/forms/contact-form';

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

    // Simulação do envio de e-mail/salvamento em BD
    // No console do servidor (terminal onde 'npm run dev' está rodando)
    console.log('--- Nova Mensagem de Contato Recebida ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Mensagem Original:', message);
    console.log('Mensagem Melhorada pela IA:', improvedMessage);
    console.log('----------------------------------------');

    // Aqui você integraria um serviço de e-mail real (Resend, SendGrid, Nodemailer)
    // ou salvaria os dados em um banco de dados (Firebase Firestore, Supabase, etc.)
    // Exemplo: await sendEmail({ to: 'seu-email@example.com', subject: `Nova mensagem de ${name}`, body: `De: ${email}\n\n${improvedMessage}` });

    return {
      success: true,
      message: 'Sua mensagem foi recebida e processada com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.',
    };
  }
}
