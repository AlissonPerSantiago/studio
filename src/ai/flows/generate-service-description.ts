
'use server';
/**
 * @fileOverview Este arquivo continha um Genkit flow para gerar descrições de serviço.
 * Foi desativado e simplificado porque a funcionalidade de IA não pode ser executada em um build estático (output: 'export')
 * sem um backend Node.js.
 */

export type GenerateServiceDescriptionInput = { prompt: string };
export type GenerateServiceDescriptionOutput = { description: string };

export function generateServiceDescription(
  input: GenerateServiceDescriptionInput
): Promise<GenerateServiceDescriptionOutput> {
  // Retornar um valor mockado para evitar erros de build em exportação estática.
  return Promise.resolve({ description: "AI functionality disabled for static export." });
}
