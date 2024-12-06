<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="order">
      <h2>Order ID: {{ order._id }}</h2>
      <p><strong>Kleur:</strong> {{ order.color }}</p>
      <p><strong>Materiaal:</strong> {{ order.material }}</p>
      <p><strong>Maat:</strong> {{ order.size }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      
      <!-- Knoppen voor de admin -->
      <button @click="markAsShipped" :disabled="order.status === 'Verzonden'">Markeer als verzonden</button>
      <button @click="cancelOrder" :disabled="order.status === 'Geannuleerd'">Annuleer bestelling</button>

      <!-- Alleen tonen als de status 'Geannuleerd' is -->
      <button v-if="order.status === 'Geannuleerd'" @click="deleteOrder">Verwijder bestelling</button>
    </div>
    <div v-else>
      <p>Loading order...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      order: null, // Houd de ordergegevens bij
      error: null, // Foutmelding indien nodig
      socket: null, // WebSocket object
    };
  },
  created() {
    this.fetchOrderDetails(); // Haal de orderdetails op zodra het component wordt geladen
    this.setupWebSocket(); // Zet de WebSocket-verbinding op
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.params.id; // Haal de order ID op uit de URL
      axios
        .get(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          this.order = response.data.data; // Zet de ontvangen order in de `order` array
        })
        .catch((error) => {
          console.error('Fout bij het ophalen van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het ophalen van de bestelling.'; // Toon een gedetailleerde foutmelding
        });
    },
    setupWebSocket() {
      // WebSocket verbinding maken
      this.socket = io('https://swear-api-uhq5.onrender.com');

      this.socket.on('connect', () => {
        console.log('WebSocket verbonden!');
      });

      this.socket.on('orderUpdated', (updatedOrder) => {
        console.log('Updated order ontvangen via WebSocket:', updatedOrder);
        // Update de order als het de juiste is
        if (this.order && this.order._id === updatedOrder._id) {
          this.order = updatedOrder;
        }
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket verbinding verbroken');
      });
    },
    // Functie om de bestelling als verzonden te markeren
    markAsShipped() {
      const orderId = this.order._id;
      axios
        .put(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          status: 'Verzonden',
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((response) => {
          this.order.status = 'Verzonden';
          // Stuur de nieuwe status naar andere componenten via WebSocket
          this.socket.emit('orderUpdated', this.order);
        })
        .catch((error) => {
          console.error('Fout bij het bijwerken van de status:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het bijwerken van de status.';
        });
    },
    // Functie om de bestelling te annuleren
    cancelOrder() {
      const orderId = this.order._id;
      axios
        .put(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          status: 'Geannuleerd',
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((response) => {
          this.order.status = 'Geannuleerd';
          // Stuur de nieuwe status naar andere componenten via WebSocket
          this.socket.emit('orderUpdated', this.order);
        })
        .catch((error) => {
          console.error('Fout bij het annuleren van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het annuleren van de bestelling.';
        });
    },
    // Functie om de bestelling te verwijderen
    deleteOrder() {
      const orderId = this.order._id;
      axios
        .delete(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
          // Verwijder de bestelling uit de UI (kan herladen of navigeren naar een andere pagina)
          this.$router.push('/dashboard'); // Redirect naar het dashboard of een andere relevante pagina
        })
        .catch((error) => {
          console.error('Fout bij het verwijderen van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het verwijderen van de bestelling.';
        });
    },
  },
  beforeDestroy() {
    // Sluit de WebSocket verbinding wanneer het component wordt vernietigd
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 14px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:not(:disabled) {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>