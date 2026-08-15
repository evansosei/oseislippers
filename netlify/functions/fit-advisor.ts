import { GoogleGenAI } from '@google/genai';

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string>;
}

export const handler = async (event: NetlifyEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    const { floorType, warmthPreference, supportNeeds, lifestyle } = payload;

    // Read API key from Netlify environment variables (supports standard & Vite-prefixed names)
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      process.env.API_KEY ||
      process.env.VITE_API_KEY;

    if (!apiKey) {
      // Fallback response when API key is pending configuration in Netlify dashboard
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          recommendationTitle: 'The Artisan Braided Toe-Ring Sandal',
          recommendedProductId: 'ryte-braided-toering-01',
          keyBenefit: 'Moisture-wicking vegetable-tanned leather footbed with ergonomic toe-ring stability',
          detailedReasoning: 'Based on your preferences, handcrafted white calfskin leather regulates temperature seamlessly while the contoured footbed absorbs joint pressure on hardwood and tile surfaces.',
          sizingAdvice: 'True to size. Choose one size up if you prefer extra heel clearance.',
        }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the lead footwear ergonomics & material expert for "Osei Slippers", a luxury handcrafted sandal and slipper brand.
    A customer is looking for their perfect footwear recommendation.
    Customer Specs:
    - Floor surface: ${floorType || 'Hardwood'}
    - Warmth desired: ${warmthPreference || 'Cozy all-season'}
    - Foot support needs: ${supportNeeds || 'Medium ergonomic arch support'}
    - Home lifestyle: ${lifestyle || 'Working from home & lounging'}

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
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(parsed),
        };
      }
    } catch {
      // Ignored, proceed to fallback
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        recommendationTitle: 'The Heritage H-Monogram Leather Slide',
        recommendedProductId: 'ryte-heritage-hslide-04',
        keyBenefit: 'Handcrafted luxury leather with ergonomic footbed',
        detailedReasoning: responseText || 'Handcrafted cognac leather provides superior comfort and arch alignment.',
        sizingAdvice: 'True to size.',
      }),
    };
  } catch (error) {
    console.error('Netlify Fit advisor error:', error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        recommendationTitle: 'The Artisan Braided Toe-Ring Sandal',
        recommendedProductId: 'ryte-braided-toering-01',
        keyBenefit: 'Moisture-wicking vegetable-tanned leather footbed',
        detailedReasoning: 'Designed for daily comfort across all indoor surfaces with cushioned support.',
        sizingAdvice: 'True to size.',
      }),
    };
  }
};
