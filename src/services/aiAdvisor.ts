import { GoogleGenAI } from '@google/genai';

export interface FitAdvisorParams {
  floorType: string;
  warmthPreference: string;
  supportNeeds: string;
  lifestyle: string;
}

export interface RecommendationResult {
  recommendationTitle: string;
  recommendedProductId: string;
  keyBenefit: string;
  detailedReasoning: string;
  sizingAdvice: string;
}

const FALLBACK_RECOMMENDATION: RecommendationResult = {
  recommendationTitle: 'The Artisan Braided Toe-Ring Sandal',
  recommendedProductId: 'ryte-braided-toering-01',
  keyBenefit: 'Moisture-wicking vegetable-tanned leather footbed with ergonomic toe-ring stability',
  detailedReasoning:
    'Based on your preferences, handcrafted white calfskin leather regulates temperature seamlessly while the contoured footbed absorbs joint pressure on hardwood and tile surfaces.',
  sizingAdvice: 'True to size. Choose one size up if you prefer extra heel clearance.',
};

/**
 * Consult the AI Footwear Advisor across Netlify, Express, and client-side environments.
 */
export async function getFootwearRecommendation(
  params: FitAdvisorParams
): Promise<RecommendationResult> {
  // 1. Try server/serverless endpoint first (/api/fit-advisor or Netlify function)
  try {
    const res = await fetch('/api/fit-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.recommendationTitle) {
        return data;
      }
    }
  } catch (err) {
    console.info('Server API unreachable, trying direct fallback...', err);
  }

  // 2. Direct Netlify Functions endpoint check
  try {
    const res = await fetch('/.netlify/functions/fit-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.recommendationTitle) {
        return data;
      }
    }
  } catch {
    // Proceed to client-side or static fallback
  }

  // 3. Client-side fallback if VITE_GEMINI_API_KEY or GEMINI_API_KEY is available in Netlify build
  const envObj = (import.meta as any).env || {};
  const clientKey =
    envObj.VITE_GEMINI_API_KEY ||
    envObj.GEMINI_API_KEY ||
    (typeof process !== 'undefined' && (process.env?.GEMINI_API_KEY || process.env?.VITE_GEMINI_API_KEY)) ||
    (typeof window !== 'undefined' && (window as any).__ENV__?.GEMINI_API_KEY);

  if (clientKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: clientKey });
      const prompt = `You are the lead footwear ergonomics & material expert for "Osei Slippers", a luxury handcrafted sandal and slipper brand.
      A customer is looking for their perfect footwear recommendation.
      Customer Specs:
      - Floor surface: ${params.floorType || 'Hardwood'}
      - Warmth desired: ${params.warmthPreference || 'Cozy all-season'}
      - Foot support needs: ${params.supportNeeds || 'Medium ergonomic arch support'}
      - Home lifestyle: ${params.lifestyle || 'Working from home & lounging'}

      Recommend 1 primary Osei Slipper model from our collection:
      1. The Artisan Braided Toe-Ring Sandal (Pure White & Tan, Ergonomic toe loop, Hand-braided leather)
      2. The Nomad Woven Leather Cross Mule (Hand-Woven Dark Brown Italian Calfskin, Shock-absorbing sole)
      3. The Venetian Horsebit Leather Slide (Polished Black Calfskin, Gold horsebit buckle, Orthotic heel cup)
      4. The Heritage H-Monogram Leather Slide (Tan leather, Geometric H-strap, Lightweight EVA sole)
      5. The Maison V-Monogram Leather Slide (Deep Navy & Cognac, Gold V-Hardware emblem)

      Respond in clean JSON with fields:
      - recommendationTitle: String
      - recommendedProductId: String (one of: ryte-braided-toering-01, ryte-woven-cross-mule-02, ryte-venetian-horsebit-03, ryte-heritage-hslide-04, ryte-maison-vslide-05)
      - keyBenefit: String
      - detailedReasoning: String (150 words max, stylish, helpful, luxury tone)
      - sizingAdvice: String
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (clientErr) {
      console.warn('Client-side Gemini call failed, using intelligent fallback:', clientErr);
    }
  }

  // 4. Guaranteed luxury recommendation fallback
  return FALLBACK_RECOMMENDATION;
}
