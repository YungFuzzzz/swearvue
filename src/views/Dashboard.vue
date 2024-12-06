<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Foutmelding weergeven -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Totaal aantal bestellingen -->
    <p><strong>Aantal bestellingen:</strong> {{ orders.length }}</p>

    <!-- Lijst met bestellingen -->
    <div v-if="orders.length" class="orders-list">
      <div v-for="order in orders" :key="order._id" class="order-card">
        <router-link :to="`/orders/${order._id}`" class="order-link">
          <h3>Order ID: {{ order._id }}</h3>
        </router-link>

        <div class="order-details">
          <p><strong>Status:</strong> 
            <span :class="getStatusClass(order.status)">{{ order.status }}</span>
          </p>
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
        .catch(() => {
          this.error = 'Er is een probleem met het ophalen van de bestellingen.';
        });
    },
    setupWebSocket() {
      this.socket = io('https://swear-api-uhq5.onrender.com');
      
      this.socket.on('orderUpdated', (updatedOrder) => {
        const index = this.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          this.orders.splice(index, 1, updatedOrder);
        }
      });
    },
    getStatusClass(status) {
      const normalizedStatus = status.trim().toLowerCase();

      const statusClasses = {
        verzonden: 'status-sent',
        geannuleerd: 'status-canceled',
        default: 'status-pending'
      };
      
      return statusClasses[normalizedStatus] || statusClasses.default;
    },
  },
  beforeDestroy() {
    this.socket?.disconnect();
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

.status-pending {
  color: orange;
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