import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'Ryte Slippers API' });
  });

  // API Route: AI Fit Advisor / Warmth Assistant
  app.post('/api/fit-advisor', async (req, res) => {
    try {
      const { floorType, warmthPreference, supportNeeds, lifestyle } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback intelligent recommendation if key is pending configuration
        return res.json({
          recommendation: "Based on your preferences, we strongly recommend **The Nord Shearling Mule** or **The Cloud Foam Slide**.",
          reasoning: "For hardwood floors and cozy warmth, Australian shearling provides optimal temperature regulation and quiet stepping, while cloud foam delivers zero-gravity shock absorption.",
          suggestedProducts: ['ryte-shearling-lounge-02', 'ryte-cloud-slide-01'],
          careTip: "Keep your slippers fresh by airing them out weekly and spot cleaning with soft suede/microfiber brushes."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead footwear ergonomics & material expert for "Ryte Slippers", a luxury Japanese/Scandinavian minimalist indoor slipper brand.
      A customer is looking for their perfect slipper recommendation.
      Customer Specs:
      - Floor surface: ${floorType || 'Hardwood'}
      - Warmth desired: ${warmthPreference || 'Cozy all-season'}
      - Foot support needs: ${supportNeeds || 'Medium ergonomic arch support'}
      - Home lifestyle: ${lifestyle || 'Working from home & relaxing'}

      Recommend 1 primary Ryte Slipper from our collection:
      1. The Cloud Foam Slide (Zero-gravity EVA, waterproof, quick-drying, shock-absorbing)
      2. The Nord Shearling Mule (100% Australian shearling, cozy suede, luxury warm fleece)
      3. The Oslo Boiled Wool Clog (Contoured cork arch support, recycled merino wool)
      4. The Kyoto Leather Lounge Slipper (Full-grain Italian leather, ultra-sleek, minimalist)
      5. The Alpine Quilted Thermal Slipper (PrimaLoft insulation, water repellent, cold-patio safe)

      Respond in clean JSON with fields:
      - recommendationTitle: String
      - recommendedProductId: String (one of: ryte-cloud-slide-01, ryte-shearling-lounge-02, ryte-wool-mule-03, ryte-leather-clog-04, ryte-quilted-bootie-05)
      - keyBenefit: String
      - detailedReasoning: String (150 words max, stylish, helpful, minimalist luxury tone)
      - sizingAdvice: String
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      // Try parsing JSON or output text fallback
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json(parsed);
        }
      } catch (err) {
        console.warn('Could not parse JSON from Gemini response, sending raw text');
      }

      res.json({
        recommendationTitle: "The Nord Shearling Mule",
        recommendedProductId: "ryte-shearling-lounge-02",
        keyBenefit: "Temperature-regulating fleece with natural latex dampening",
        detailedReasoning: responseText || "The Nord Shearling Mule is expertly tailored for your home environment, offering supreme warmth without moisture buildup.",
        sizingAdvice: "True to size. If between sizes, choose one size up for plush fleece clearance."
      });

    } catch (error) {
      console.error('Fit advisor API error:', error);
      res.status(500).json({
        recommendationTitle: "The Cloud Foam Slide",
        recommendedProductId: "ryte-cloud-slide-01",
        keyBenefit: "Universal ergonomic comfort",
        detailedReasoning: "Our signature high-density EVA foam absorbs joint impact while keeping feet fresh.",
        sizingAdvice: "True to size."
      });
    }
  });

  // Vite Dev Server Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ryte Slippers] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
