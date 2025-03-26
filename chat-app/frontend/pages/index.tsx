import { useState, useEffect } from "react";

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

export default function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Connect to WebSocket
  useEffect(() => {
    if (!username) return;

    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onopen = () => {
      setIsConnected(true);
      socket.send(JSON.stringify({ username }));
    };

    socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => socket.close();
  }, [username]);

  const sendMessage = () => {
    if (ws && input && isConnected) {
      ws.send(JSON.stringify({ text: input }));
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Real-Time Chat</h1>

      {!username ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={() => setUsername(username.trim())}>Join Chat</button>
        </div>
      ) : (
        <>
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, idx) => (
              <p key={idx}>
                <strong>{msg.username}</strong> ({new Date(msg.timestamp).toLocaleTimeString()}):{" "}
                {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            disabled={!isConnected}
            style={{ width: "80%", padding: "5px" }}
          />
          <button onClick={sendMessage} disabled={!isConnected}>
            Send
          </button>
          <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
        </>
      )}
    </div>
  );
}