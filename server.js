const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/mcp', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  const intervalId = setInterval(() => {
    const data = {
      tipo: 'mensagem',
      timestamp: new Date().toISOString(),
      conteudo: 'Mensagem de teste do MCP Server'
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`✅ MCP Server rodando em http://localhost:${PORT}/mcp`);
});
