<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="order">
      <h2>Order ID: {{ order._id }}</h2>

      <!-- Algemene bestelling details -->
      <p><strong>Color Laces:</strong> 
        <span v-if="order.components?.laces">{{ order.components.laces.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Laces:</strong> 
        <span v-if="order.components?.laces">{{ order.components.laces.material }}</span>
        <span v-else>No material present</span>
      </p>
      <p><strong>Shoe Size:</strong> {{ order.size }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>

      <!-- Solen -->
      <p><strong>Color Sole:</strong> 
        <span v-if="order.components?.sole">{{ order.components.sole.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Sole:</strong> 
        <span v-if="order.components?.sole">{{ order.components.sole.material }}</span>
        <span v-else>No material present</span>
      </p>

      <!-- Binnenkant -->
      <p><strong>Color Sole Inside:</strong> 
        <span v-if="order.components?.inside">{{ order.components.inside.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Sole Inside:</strong> 
        <span v-if="order.components?.inside">{{ order.components.inside.material }}</span>
        <span v-else>No material present</span>
      </p>

      <!-- Buitenste delen -->
      <p><strong>Color Outside Part 1:</strong> 
        <span v-if="order.components?.outside?.part1">{{ order.components.outside.part1.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Outside Part 1:</strong> 
        <span v-if="order.components?.outside?.part1">{{ order.components.outside.part1.material }}</span>
        <span v-else>No material present</span>
      </p>
      
      <p><strong>Color Outside Part 2:</strong> 
        <span v-if="order.components?.outside?.part2">{{ order.components.outside.part2.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Outside Part 2:</strong> 
        <span v-if="order.components?.outside?.part2">{{ order.components.outside.part2.material }}</span>
        <span v-else>No material present</span>
      </p>
      
      <p><strong>Color Outside Part 3:</strong> 
        <span v-if="order.components?.outside?.part3">{{ order.components.outside.part3.color }}</span>
        <span v-else>No color present</span>
      </p>
      <p><strong>Material Outside Part 3:</strong> 
        <span v-if="order.components?.outside?.part3">{{ order.components.outside.part3.material }}</span>
        <span v-else>No material present</span>
      </p>

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
      order: null,
      error: null,
      socket: null,
    };
  },
  created() {
    this.fetchOrderDetails();
    this.setupWebSocket();
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.params.id;
      axios
        .get(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          this.order = response.data.data;
        })
        .catch((error) => {
          console.error('Fout bij het ophalen van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het ophalen van de bestelling.';
        });
    },
    setupWebSocket() {
      this.socket = io('https://swear-api-uhq5.onrender.com');

      this.socket.on('connect', () => {
        console.log('WebSocket verbonden!');
      });

      this.socket.on('orderUpdated', (updatedOrder) => {
        console.log('Updated order ontvangen via WebSocket:', updatedOrder);
        if (this.order && this.order._id === updatedOrder._id) {
          this.order = updatedOrder;
        }
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket verbinding verbroken');
      });
    },
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
          this.socket.emit('orderUpdated', this.order);
        })
        .catch((error) => {
          console.error('Fout bij het bijwerken van de status:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het bijwerken van de status.';
        });
    },
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
          this.socket.emit('orderUpdated', this.order);
        })
        .catch((error) => {
          console.error('Fout bij het annuleren van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het annuleren van de bestelling.';
        });
    },
    deleteOrder() {
      const orderId = this.order._id;
      axios
        .delete(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          console.error('Fout bij het verwijderen van de bestelling:', error);
          this.error = error.response ? error.response.data.message : 'Er is een probleem met het verwijderen van de bestelling.';
        });
    },
  },
  beforeDestroy() {
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
  background-color: #69ff47;
  color: #000;
  border: none;
  cursor: pointer;
}

button:hover:not(:disabled) {
  text-decoration: underline;
}
</style>