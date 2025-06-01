
'use server';

// Este arquivo foi intencionalmente esvaziado.
// A funcionalidade de envio de email foi migrada para o Formspree
// no componente src/components/forms/contact-form.tsx.
// Manter a lógica anterior baseada em Nodemailer aqui (mesmo comentada)
// pode causar "Internal Server Errors" durante o build de um site estático (output: 'export')
// porque Nodemailer e outras dependências do lado do servidor não podem ser executadas
// em um ambiente puramente estático.
//
// Se você precisar reativar o envio de email via backend no futuro (por exemplo,
// mudando para um ambiente de hospedagem com Node.js), você precisará
// reimplementar a lógica de envio de email aqui e ajustar o formulário de contato
// para chamar esta server action novamente.

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

interface SubmitContactFormResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResponse> {
  console.warn("submitContactForm (server action) was called but is disabled for static export. Contact form uses Formspree.");
  return { success: false, message: "Server action disabled for static export. Use Formspree." };
}
