<template>
  <div class="orders">
    <h2>Orders</h2>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <router-link :to="'/orders/' + order.id">{{ order.id }} - {{ order.status }}</router-link>
        <button @click="updateStatus(order.id, 'shipped')">Mark as Shipped</button>
        <button @click="deleteOrder(order.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      const response = await fetch('/api/orders');
      this.orders = await response.json();
    },
    async updateStatus(id, status) {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { 'Content-Type': 'application/json' }
      });
      this.fetchOrders(); // Re-fetch orders to update the status
    },
    async deleteOrder(id) {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      this.fetchOrders(); // Re-fetch orders after deletion
    }
  }
};
</script>

<style scoped>
.orders ul {
  list-style-type: none;
}
.orders button {
  margin-left: 10px;
}
</style>