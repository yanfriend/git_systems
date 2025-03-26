
---

### How It Works
1. **Backend**:
   - Listens on `ws://localhost:8080`.
   - Tracks clients with a `Map` of WebSocket instances to usernames.
   - Broadcasts messages to all connected clients.

2. **Frontend**:
   - Prompts for a username, then connects to the WebSocket.
   - Displays incoming messages in real-time.
   - Sends messages via the WebSocket connection.

3. **Real-Time**:
   - WebSockets enable instant bi-directional communication, unlike REST polling.

---

### Example Usage
1. Start the backend (`npm run dev` in `backend/`).
2. Start the frontend (`npm run dev` in `frontend/`).
3. Open `http://localhost:3000` in two tabs:
   - Tab 1: Join as "Alice", send "Hi there!"
   - Tab 2: Join as "Bob", see "Alice: Hi there!" and reply "Hello!"

---

### Explanation
- **Backend**: “I used TypeScript with `ws` to create a WebSocket server. It handles connections, tracks usernames, and broadcasts messages.”
- **Frontend**: “Next.js with TypeScript connects to the WebSocket, manages state for messages, and updates the UI in real-time.”
- **Real-Time**: “WebSockets provide low-latency, two-way communication, perfect for chat apps.”

Let me know if you want to add features like authentication or a database!