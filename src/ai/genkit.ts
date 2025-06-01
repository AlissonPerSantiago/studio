
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// A inicialização do Genkit foi comentada pois todos os fluxos de IA foram removidos
// devido à incompatibilidade com um ambiente de hospedagem sem Node.js.
// Se você reintroduzir funcionalidades de IA que possam ser executadas no lado do cliente
// ou através de APIs externas (sem Genkit rodando no servidor Next.js),
// você pode precisar de uma configuração diferente.

/*
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
*/

// Para evitar erros de importação se 'ai' for referenciado em algum lugar que não foi pego,
// podemos exportar um objeto mock simples ou null. No entanto, o ideal é remover todas as referências.
// Por enquanto, vamos exportar um objeto para evitar quebras de importação diretas,
// mas ele não terá funcionalidade.
export const ai = {
    defineFlow: () => {},
    definePrompt: () => {},
    generate: async () => ({ text: () => "AI functionality disabled for static export."}),
    // Adicione outros mocks de funções do Genkit se necessário
};
