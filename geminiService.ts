import { GoogleGenAI, Type, Schema } from "@google/genai";
import { IdentityResult, Question } from "../types";
import { QUIZ_QUESTIONS } from "../constants";

const getQuizContext = (answers: Record<number, string>) => {
  return QUIZ_QUESTIONS.map((q) => {
    const answerValue = answers[q.id];
    const selectedOption = q.options.find(o => o.value === answerValue);
    return `Question: ${q.text}\nAnswer: ${selectedOption?.label || "No answer provided"}`;
  }).join("\n\n");
};

export const analyzeIdentity = async (answers: Record<number, string>): Promise<IdentityResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const quizContext = getQuizContext(answers);

  const prompt = `
    You are an expert on LGBTQIA+ identities, sexual orientation, and relationship psychology. 
    Analyze the following quiz answers provided by a user to suggest the most fitting sexual identity or spectrum position.
    
    IMPORTANT: Provide the response in Simplified Chinese (简体中文).

    If the answers suggest a straight/heterosexual identity, provide a supportive "Ally" (盟友) or "Heterosexual" (异性恋) result with the corresponding flag colors.
    If the answers are mixed or unclear, suggest "Questioning" (探索中) or "Queer" (酷儿).
    
    Return a JSON object matching the schema.
    For 'flagColors', provide an array of 3-7 Hex color codes that make up the pride flag for that identity (from top to bottom).
    
    Include a list of reputable resources (websites, organizations) where the user can learn more about this specific identity or general LGBTQIA+ topics.
    
    Quiz Data:
    ${quizContext}
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      identityName: { type: Type.STRING, description: "The name of the sexual identity in Chinese (e.g., 双性恋, 半性恋, 泛性恋)." },
      shortDescription: { type: Type.STRING, description: "A one sentence summary in Chinese of what this means." },
      detailedExplanation: { type: Type.STRING, description: "A paragraph in Chinese explaining why this might fit based on their specific answers." },
      flagColors: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "Array of hex color codes for the flag stripes." 
      },
      relatedIdentities: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "Other identities they might explore (in Chinese)."
      },
      affirmation: { type: Type.STRING, description: "A positive, validating message in Chinese." },
      resources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Name of the resource or organization (e.g. The Trevor Project)" },
            url: { type: Type.STRING, description: "URL to the website" },
            description: { type: Type.STRING, description: "Short description in Chinese of what this resource offers" }
          },
          required: ["title", "url", "description"]
        },
        description: "List of 2-3 helpful external resources."
      }
    },
    required: ["identityName", "shortDescription", "detailedExplanation", "flagColors", "relatedIdentities", "affirmation", "resources"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as IdentityResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback result in Chinese
    return {
      identityName: "探索模式",
      shortDescription: "我们目前无法生成具体结果。",
      detailedExplanation: "连接分析引擎时出现问题。但是，您的回答反映了独特的恋爱观。",
      flagColors: ["#FF0018", "#FFA52C", "#FFFF41", "#008018", "#0000F9", "#86007D"],
      relatedIdentities: ["人类", "有效"],
      affirmation: "无论标签如何，您的感受都是有效的。",
      resources: [
        { title: "PFLAG", url: "https://pflag.org/", description: "为LGBTQ+人群及其家人提供支持、教育和宣传。" },
        { title: "The Trevor Project", url: "https://www.thetrevorproject.org/", description: "为LGBTQ青少年提供危机干预和自杀预防服务。" }
      ]
    };
  }
};