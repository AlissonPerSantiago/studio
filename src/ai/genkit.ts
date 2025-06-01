// As importações de 'genkit' e '@genkit-ai/googleai' foram removidas
// pois estas bibliotecas são destinadas a ambientes Node.js e não são
// compatíveis com um build puramente estático (output: 'export').
// Manter as importações, mesmo que o código de inicialização esteja comentado,
// pode levar a erros durante o processo de build do Next.js para exportação estática.

// Para evitar erros de importação se 'ai' for referenciado em algum lugar,
// exportamos um objeto mock simples. Se nenhuma funcionalidade de IA for
// usada no lado do cliente, idealmente todas as referências a este 'ai' mock
// também seriam removidas dos componentes.
export const ai = {
  defineFlow: (...args: any[]): any => {
    console.warn("Genkit ai.defineFlow called in static export mode. AI functionality is disabled.");
    return async (input: any) => {
      throw new Error("AI Flow executed in static mode, which is not supported.");
    };
  },
  definePrompt: (...args: any[]): any => {
    console.warn("Genkit ai.definePrompt called in static export mode. AI functionality is disabled.");
    return async (input: any) => {
      return { output: "AI Prompt called in static mode. Functionality disabled." };
    };
  },
  generate: async (options: any): Promise<any> => {
    console.warn("Genkit ai.generate called in static export mode. AI functionality is disabled.");
    return { text: () => "AI functionality disabled for static export." };
  },
  // Adicione outros mocks de funções do Genkit se forem estritamente necessários
  // para evitar quebras de importação, mas lembre-se que a funcionalidade real não existirá.
};
