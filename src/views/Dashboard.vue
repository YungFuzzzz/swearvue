<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Foutmelding weergeven -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Totaal aantal bestellingen -->
    <p><strong>Aantal bestellingen:</strong> {{ orders.length }}</p>

    <!-- Lijst met bestellingen -->
    <div v-if="orders.length > 0" class="orders-list">
      <div v-for="order in orders" :key="order._id" class="order-card">
        <router-link :to="`/orders/${order._id}`" class="order-link">
          <h3>Order ID: {{ order._id }}</h3>
        </router-link>

        <div class="order-details">
          <p><strong>Kleur:</strong> {{ order.color }}</p>
          <p><strong>Maat:</strong> {{ order.size }}</p>
          <p><strong>Materiaal:</strong> {{ order.material }}</p>
          <p><strong>Status:</strong> <span :class="getStatusClass(order.status)">{{ order.status }}</span></p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Geen bestellingen gevonden.</p>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      error: null,
      socket: null,
    };
  },
  created() {
    this.fetchOrders();
    this.setupWebSocket();
  },
  methods: {
    fetchOrders() {
      axios
        .get('https://swear-api-uhq5.onrender.com/api/v1/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          this.orders = response.data.data;
        })
        .catch((error) => {
          console.error('Fout bij ophalen orders:', error);
          this.error = 'Er is een probleem met het ophalen van de bestellingen.';
        });
    },
    setupWebSocket() {
      this.socket = io('https://swear-api-uhq5.onrender.com');

      this.socket.on('connect', () => {
        console.log('WebSocket verbonden!');
      });

      this.socket.on('orderUpdated', (updatedOrder) => {
        console.log('Order bijgewerkt via WebSocket:', updatedOrder);

        // Update specifieke order in de lijst
        const index = this.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          this.orders.splice(index, 1, updatedOrder);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket verbinding verbroken');
      });
    },
    getStatusClass(status) {
      return status === 'verzonden' ? 'status-sent' : 'status-canceled';
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
.dashboard {
  padding: 20px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  font-weight: bold;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.order-card {
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.order-link {
  text-decoration: none;
  color: #333;
}

.order-link:hover {
  color: #007bff;
}

.order-details p {
  margin: 5px 0;
}

.status-sent {
  color: green;
  font-weight: bold;
}

.status-canceled {
  color: red;
  font-weight: bold;
}
</style>