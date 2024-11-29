<template>
  <div class="orders">
    <h2>Orders</h2>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <p><strong>Order ID:</strong> {{ order.id }}</p>
        <p><strong>Customer Name:</strong> {{ order.customerName }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <button @click="viewOrder(order.id)">View Details</button>
        <button @click="deleteOrder(order.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Primus from 'primus';

export default {
  data() {
    return {
      orders: [],
      primus: null
    };
  },
  created() {
    this.fetchOrders();
    this.setupWebSocket();
  },
  beforeDestroy() {
    if (this.primus) {
      this.primus.end(); // Verbreek de WebSocket-verbinding bij het verlaten van de component
    }
  },
  methods: {
    async fetchOrders() {
      // Haal alle bestellingen op via de API
      const response = await fetch('/api/orders');
      const data = await response.json();
      this.orders = data;
    },
    setupWebSocket() {
      this.primus = new Primus('http://localhost:3000'); // Verbind met de WebSocket-server

      // Luister naar het 'new-order' event voor nieuwe bestellingen
      this.primus.on('new-order', (newOrder) => {
        this.orders.push(newOrder); // Voeg de nieuwe bestelling toe aan de lijst
        console.log('New order received:', newOrder);
      });

      // Luister naar wijzigingen in de status van bestellingen
      this.primus.on('order-status-updated', (updatedOrder) => {
        const index = this.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          // Werk de status van de bestelling bij
          this.orders[index].status = updatedOrder.status;
          console.log('Order status updated:', updatedOrder);
        }
      });
    },
    viewOrder(orderId) {
      this.$router.push(`/orders/${orderId}`);
    },
    async deleteOrder(orderId) {
      // Deleting order from the API
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Verwijder de bestelling uit de lijst
        this.orders = this.orders.filter(order => order.id !== orderId);
        console.log('Order deleted:', orderId);
      }
    }
  }
};
</script>

<style scoped>
.orders {
  padding: 20px;
}
.orders ul {
  list-style-type: none;
  padding: 0;
}
.orders li {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
button {
  margin-top: 10px;
}
</style>