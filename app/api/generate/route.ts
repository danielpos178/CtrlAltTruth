
// Licensed under the GNU AGPL-3.0-only.

import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topicTitle, topicDescription } = await req.json();

    const apiKeys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    ].filter(key => key && typeof key === 'string' && key.length > 20 && !key.includes("your_api_key")) as string[];

    if (apiKeys.length === 0) {
      return NextResponse.json({ error: "Nu a fost găsită nicio cheie API Gemini." }, { status: 500 });
    }

    let response;
    let lastError;

    for (const apiKey of apiKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
          Ești un expert în psihologia maselor și dezinformare.
          Scrie un text manipulator de aproximativ 45-50 de cuvinte despre subiectul: "${topicTitle}".
          Context: ${topicDescription}
          Extrage cuvintele toxice într-un array.
          
          NOUTATE: La câmpul 'explanation', nu oferi doar o explicație generală. Trebuie să explici specific CUM aceste cuvinte toxice influențează un public neinformat (ex: 'Cuvântul X scurtcircuitează gândirea rațională declanșând frica, determinând cititorul să accepte soluții extreme fără a cere dovezi').
        `;

        response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                text: {
                  type: Type.STRING,
                  description: "Textul manipulator generat.",
                },
                toxicWords: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                  description: "Lista de cuvinte toxice sau manipulatoare din text (fără punctuație, litere mici).",
                },
                explanation: {
                  type: Type.STRING,
                  description: "Explicația tehnicilor de manipulare folosite.",
                },
                emotions: {
                  type: Type.OBJECT,
                  description: "Scoruri de la 0 la 100 pentru emoțiile declanșate de text.",
                  properties: {
                    fear: { type: Type.NUMBER },
                    anger: { type: Type.NUMBER },
                    urgency: { type: Type.NUMBER },
                    validation: { type: Type.NUMBER }
                  },
                  required: ["fear", "anger", "urgency", "validation"]
                }
              },
              required: ["text", "toxicWords", "explanation", "emotions"],
            },
          },
        });

        break;
      } catch (error: any) {
        console.warn("API Key failed, trying next one...", error);
        lastError = error;
      }
    }

    if (!response) {
      const FALLBACK_ARTICLES = [
        {
          text: "Inteligența artificială va distruge piața muncii într-un ritm catastrofal. Milioane de angajați vor fi aruncați în stradă de corporații lacome. Este o apocalipsă economică iminentă, iar guvernele refuză să ne protejeze de această amenințare.",
          toxicWords: ["distruge", "catastrofal", "aruncați", "lacome", "apocalipsă", "iminentă", "refuză", "amenințare"],
          explanation: "Textul folosește hiperbole ('apocalipsă', 'catastrofal') și cuvinte cu încărcătură emoțională negativă ('lacome') pentru a declanșa frica. Cuvântul 'catastrofal' scurtcircuitează gândirea rațională, determinând cititorul să accepte soluții extreme.",
          emotions: { fear: 90, anger: 80, urgency: 85, validation: 20 }
        },
        {
          text: "Elita globalistă ascunde adevărul șocant despre încălzirea globală. Această farsă monumentală este folosită pentru a ne fura libertățile și a ne impune taxe aberante. Oamenii de știință corupți ne mint cu nerușinare în fiecare zi.",
          toxicWords: ["elita", "globalistă", "șocant", "farsă", "monumentală", "fura", "aberante", "corupți", "mint", "nerușinare"],
          explanation: "Acest text folosește limbaj conspirativ ('elita globalistă', 'farsă monumentală') și acuzații grave ('corupți', 'mint') pentru a crea indignare. Cuvântul 'șocant' declanșează o reacție emoțională care blochează analiza critică.",
          emotions: { fear: 70, anger: 95, urgency: 80, validation: 30 }
        }
      ];
      console.warn("Using fallback article due to API failure:", lastError);
      return NextResponse.json(FALLBACK_ARTICLES[Math.floor(Math.random() * FALLBACK_ARTICLES.length)]);
    }

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      const data = JSON.parse(jsonStr);
      return NextResponse.json(data);
    } else {
      throw new Error("Invalid response from Gemini");
    }
  } catch (error: any) {
    console.error("Error in generate API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
