<template>
  <div class="order-detail" v-if="order">
    <h2>Order #{{ order.id }} Details</h2>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Customer Name:</strong> {{ order.customerName }}</p>
    <p><strong>Total:</strong> ${{ order.total }}</p>
    <button @click="updateStatus('shipped')">Mark as Shipped</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      const orderId = this.$route.params.id;
      const response = await fetch(`/api/orders/${orderId}`);
      this.order = await response.json();
    },
    async updateStatus(status) {
      const orderId = this.$route.params.id;
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { 'Content-Type': 'application/json' }
      });
      this.order.status = status; // Update the status locally
    }
  }
};
</script>

<style scoped>
.order-detail {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>