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
    res.json({ status: 'ok', store: 'Osei Luxury Slippers API' });
  });

  // API Route: AI Fit Advisor / Warmth Assistant
  app.post('/api/fit-advisor', async (req, res) => {
    try {
      const { floorType, warmthPreference, supportNeeds, lifestyle } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback intelligent recommendation if key is pending configuration
        return res.json({
          recommendationTitle: "The Artisan Braided Toe-Ring Sandal",
          recommendedProductId: "ryte-braided-toering-01",
          keyBenefit: "Moisture-wicking vegetable-tanned leather footbed with ergonomic toe-ring stability",
          detailedReasoning: "Based on your preferences, handcrafted white calfskin leather regulates temperature seamlessly while the contoured footbed absorbs joint pressure on hardwood and tile surfaces.",
          sizingAdvice: "True to size. Choose one size up if you prefer extra heel clearance."
        });
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
