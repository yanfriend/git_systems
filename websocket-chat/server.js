const WebSocket = require("ws");

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

console.log(`🚀 WebSocket server running on ws://localhost:${PORT}`);

server.on("connection", (ws) => {
  console.log("✅ New client connected");

  ws.on("message", (message) => {
    console.log(`📩 Received: ${message}`);
    
    // Broadcast to all clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});
