
'use server';

// Este arquivo foi intencionalmente esvaziado e simplificado.
// A funcionalidade de envio de email foi migrada para o Formspree
// no componente src/components/forms/contact-form.tsx e para compatibilidade com build estático.

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

interface SubmitContactFormResponse {
  success: boolean;
  message: string;
}

export function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResponse> {
  // Retornar um valor mockado para evitar erros de build em exportação estática.
  return Promise.resolve({ success: false, message: "Server action disabled for static export." });
}
