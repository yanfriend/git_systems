const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const socket = new WebSocket('ws://localhost:3000'); // Connect to the server

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
  const message = event.data;
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.send(message);
    messageInput.value = '';
  }
});