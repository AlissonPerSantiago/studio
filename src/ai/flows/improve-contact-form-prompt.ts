
'use server';
/**
 * @fileOverview Este arquivo anteriormente continha um Genkit flow para melhorar prompts de formulário de contato.
 * Foi desativado porque a funcionalidade de IA não pode ser executada em um build estático (output: 'export')
 * sem um backend Node.js.
 */

// O conteúdo original foi removido para evitar erros de build ou runtime.
// Se precisar reativar, certifique-se de que o ambiente de hospedagem suporta Node.js e Genkit.

export type ImproveContactFormPromptInput = { currentPrompt: string };
export type ImproveContactFormPromptOutput = { improvedPrompt: string };

export async function improveContactFormPrompt(
  input: ImproveContactFormPromptInput
): Promise<ImproveContactFormPromptOutput> {
  console.warn("improveContactFormPrompt (AI flow) called but is disabled for static export. Returning mock data.");
  // Não lançar erro para não quebrar o build estático.
  return { improvedPrompt: "AI-improved prompt is disabled for static export." };
}

