
'use server';
/**
 * @fileOverview Este arquivo anteriormente continha um Genkit flow para gerar descrições de serviço.
 * Foi desativado porque a funcionalidade de IA não pode ser executada em um build estático (output: 'export')
 * sem um backend Node.js.
 */

// O conteúdo original foi removido para evitar erros de build ou runtime.
// Se precisar reativar, certifique-se de que o ambiente de hospedagem suporta Node.js e Genkit.

export type GenerateServiceDescriptionInput = { prompt: string };
export type GenerateServiceDescriptionOutput = { description: string };

export async function generateServiceDescription(
  input: GenerateServiceDescriptionInput
): Promise<GenerateServiceDescriptionOutput> {
  console.warn("generateServiceDescription (AI flow) called but is disabled for static export. Returning mock data.");
  // Não lançar erro para não quebrar o build estático.
  return { description: "AI-generated description is disabled for static export." };
}

