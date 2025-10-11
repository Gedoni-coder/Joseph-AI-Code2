import type { Plugin } from 'vite';

export default function aiProxy(): Plugin {
  return {
    name: 'ai-proxy',
    configureServer(server) {
      const parseBody = async (req: any): Promise<any> => {
        const chunks: Buffer[] = [];
        await new Promise<void>((resolve) => {
          req.on('data', (c: Buffer) => chunks.push(c));
          req.on('end', () => resolve());
        });
        const raw = Buffer.concat(chunks).toString('utf-8');
        try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
      };

      server.middlewares.use('/api/ai/gemini', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return; }
        const body = await parseBody(req);
        const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) { res.statusCode = 500; res.end('Missing GEMINI_API_KEY'); return; }
        const model = body?.model || body?.upstreamModel || 'gemini-1.5-flash';
        const upstreamBody = body?.upstreamBody || {
          contents: body?.contents || [],
          systemInstruction: body?.systemInstruction,
          generationConfig: body?.generationConfig,
        };
        try {
          const url = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const r = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(upstreamBody),
          });
          const text = await r.text();
          res.statusCode = r.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(text);
        } catch (e) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Upstream error' }));
        }
      });

      server.middlewares.use('/api/ai/openai', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return; }
        const body = await parseBody(req);
        const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
        if (!apiKey) { res.statusCode = 500; res.end('Missing OPENAI_API_KEY'); return; }
        try {
          const r = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: body?.model || 'gpt-4o-mini',
              temperature: typeof body?.temperature === 'number' ? body.temperature : 0.3,
              messages: body?.messages || [],
            }),
          });
          const text = await r.text();
          res.statusCode = r.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(text);
        } catch (e) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Upstream error' }));
        }
      });
    },
  };
}
