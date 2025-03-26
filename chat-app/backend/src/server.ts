import WebSocket, { WebSocketServer } from "ws";

// Create WebSocket server
const wss = new WebSocketServer({ port: 8080 });

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

// Store connected clients
const clients = new Map<WebSocket, string>(); // WebSocket -> username

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  // Handle incoming messages
  ws.on("message", (data: string) => {
    const message: Message = JSON.parse(data);

    if (message.username && !message.text) {
      // Register username on first connection
      clients.set(ws, message.username);
      broadcast({
        username: "Server",
        text: `${message.username} joined the chat`,
        timestamp: new Date().toISOString(),
      });
    } else if (message.text && clients.has(ws)) {
      // Broadcast message to all clients
      broadcast({
        username: clients.get(ws)!,
        text: message.text,
        timestamp: new Date().toISOString(),
      });
    }
  });

  ws.on("close", () => {
    const username = clients.get(ws);
    if (username) {
      clients.delete(ws);
      broadcast({
        username: "Server",
        text: `${username} left the chat`,
        timestamp: new Date().toISOString(),
      });
    }
    console.log("Client disconnected");
  });
});

// Broadcast message to all connected clients
function broadcast(message: Message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

console.log("WebSocket server running on ws://localhost:8080");