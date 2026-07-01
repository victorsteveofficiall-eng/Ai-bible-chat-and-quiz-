import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('Warning: GEMINI_API_KEY environment variable is not set. AI Chat feature will return fallback responses.');
}

// AI Bible Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array provided.' });
    }

    if (!ai) {
      // Graceful fallback if API key is not present
      return res.json({
        text: "Peace be with you! It looks like the Gemini API Key is not configured yet. You can set it up in **Settings > Secrets** using the key `GEMINI_API_KEY`. Once set up, I will be able to answer any biblical questions, analyze verses, and explore theological context with you!",
      });
    }

    // Convert messages to Gemini role-part format
    // Valid roles: "user", "model"
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: `You are the official AI Bible Chaplain and Scholar for the "AI Chat and Bible Quiz" application.
Your goal is to help users explore scripture, understand cultural & historical context, find spiritual guidance, and answer theological questions with grace, kindness, and deep academic insight.
Always refer to or cite the King James Version (KJV) when presenting verses.
Keep your tone encouraging, warm, respectful, and scholarly.

CRITICAL: Keep your responses highly focused, direct, and concise (under 200-250 words) to ensure lightning-fast loading times. Do not write unnecessarily long preambles, and get straight to the helpful, spiritually comforting, or scholarly answer. Format beautifully with concise Markdown (e.g., bold key words, blockquotes, brief bullets).`,
        temperature: 0.3,
        maxOutputTokens: 500,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while talking to the AI Chaplain.' });
  }
});

// Setup Vite Middleware or Static assets
const startServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static build.');
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on host 0.0.0.0, port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
