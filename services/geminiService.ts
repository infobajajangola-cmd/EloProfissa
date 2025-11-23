import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PROFESSIONALS } from "../constants";
import { SearchResponse } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.API_KEY;
    if (this.apiKey) {
      this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    } else {
      console.warn("API Key not found. Gemini features will be disabled.");
      // Dummy init to prevent crash if called without key check
      this.ai = new GoogleGenAI({ apiKey: 'dummy' });
    }
  }

  async findProfessionals(userQuery: string): Promise<SearchResponse> {
    if (!this.apiKey) {
      // Fallback simple search if no API key
      const lowerQuery = userQuery.toLowerCase();
      const matches = MOCK_PROFESSIONALS.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery) ||
        p.skills.some(s => s.toLowerCase().includes(lowerQuery))
      );
      return {
        matchedProfessionalIds: matches.map(p => p.id),
        reasoning: "Busca realizada por palavra-chave (API Key não configurada).",
        suggestedCategory: "Geral"
      };
    }

    try {
      const professionalsList = MOCK_PROFESSIONALS.map(p => ({
        id: p.id,
        name: p.name,
        title: p.title,
        category: p.category,
        skills: p.skills,
        description: p.description,
        location: p.location
      }));

      const prompt = `
        Você é um assistente inteligente de uma plataforma de contratação de serviços em ANGOLA.
        O usuário descreveu o seguinte problema ou necessidade: "${userQuery}".
        
        Aqui está a lista de profissionais disponíveis no sistema (Angola):
        ${JSON.stringify(professionalsList)}

        Sua tarefa:
        1. Analisar o pedido do usuário.
        2. Selecionar os IDs dos profissionais mais adequados para resolver o problema, considerando a descrição e as skills.
        3. Explicar brevemente o raciocínio em português de Angola.
        4. Sugerir a categoria mais apropriada.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchedProfessionalIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Lista de IDs dos profissionais recomendados"
              },
              reasoning: {
                type: Type.STRING,
                description: "Explicação curta do motivo da escolha em português."
              },
              suggestedCategory: {
                type: Type.STRING,
                description: "A categoria sugerida para a busca."
              }
            },
            required: ["matchedProfessionalIds", "reasoning", "suggestedCategory"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}") as SearchResponse;
      return result;

    } catch (error) {
      console.error("Erro ao consultar Gemini:", error);
      return {
        matchedProfessionalIds: [],
        reasoning: "Desculpe, houve um erro ao processar sua solicitação com IA.",
        suggestedCategory: "Erro"
      };
    }
  }
}

export const geminiService = new GeminiService();