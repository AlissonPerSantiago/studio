
'use server';
/**
 * @fileOverview Este arquivo continha um Genkit flow para melhorar prompts de formulário de contato.
 * Foi desativado e simplificado porque a funcionalidade de IA não pode ser executada em um build estático (output: 'export')
 * sem um backend Node.js.
 */

export type ImproveContactFormPromptInput = { currentPrompt: string };
export type ImproveContactFormPromptOutput = { improvedPrompt: string };

export function improveContactFormPrompt(
  input: ImproveContactFormPromptInput
): Promise<ImproveContactFormPromptOutput> {
  // Retornar um valor mockado para evitar erros de build em exportação estática.
  return Promise.resolve({ improvedPrompt: "AI functionality disabled for static export." });
}
