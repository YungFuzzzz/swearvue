<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p><strong>Totaal aantal bestellingen:</strong> {{ totalOrders }}</p>

    <div v-if="orders.length === 0">
      <p>Geen bestellingen beschikbaar.</p>
    </div>
    <ul v-else class="order-list">
      <li v-for="order in orders" :key="order.id" class="order-item">
        <div>
          <p><strong>Bestelling ID:</strong> {{ order.id }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
        </div>
        <button @click="viewOrderDetails(order.id)">Details bekijken</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import axios from "axios";

export default {
  data() {
    return {
      orders: [], // Alle bestellingen
      totalOrders: 0, // Teller voor het totaal aantal bestellingen
      socket: null, // WebSocket-verbinding
    };
  },
  methods: {
    fetchOrders() {
      // Bestellingen ophalen van de API
      axios
        .get("https://your-api-url.com/api/v1/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.orders = response.data;
          this.totalOrders = this.orders.length; // Totaal aantal bestellingen bijwerken
        })
        .catch((err) => {
          console.error("Fout bij het ophalen van bestellingen:", err);
        });
    },
    viewOrderDetails(orderId) {
      // Navigeer naar de details van een bestelling
      this.$router.push(`/orders/${orderId}`);
    },
  },
  created() {
    // WebSocket-verbinding opzetten
    this.socket = io("https://your-api-url.com", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    // Nieuwe bestelling ontvangen
    this.socket.on("newOrder", (order) => {
      this.orders.push(order); // Voeg de nieuwe bestelling toe aan de lijst
      this.totalOrders++; // Verhoog de teller
    });

    // Statuswijziging ontvangen
    this.socket.on("orderStatusUpdated", (updatedOrder) => {
      const index = this.orders.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        this.orders[index].status = updatedOrder.status; // Update de status
      }
    });

    // Bestellingen ophalen bij initialisatie
    this.fetchOrders();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect(); // Netjes de verbinding verbreken
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.order-list {
  list-style: none;
  padding: 0;
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.order-item button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}
.order-item button:hover {
  background-color: #0056b3;
}
</style>