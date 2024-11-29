// src/services/WebSocketService.js
import io from 'socket.io-client';

// Maak de WebSocket-verbinding met de server
const socket = io('https://swear-api-uhq5.onrender.com'); // Zorg ervoor dat je dit naar je server-URL wijst

// Functies om berichten te verzenden en ontvangen
export const useWebSocket = () => {
  const onNewOrder = (callback) => {
    socket.on('new-order', callback); // Verbindt met het 'new-order' event van de server
  };

  const sendMessage = (message) => {
    socket.emit('message', message); // Stuurt een bericht naar de server
  };

  return {
    onNewOrder,
    sendMessage,
  };
};