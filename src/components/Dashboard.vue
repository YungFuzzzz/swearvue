<template>
  <div class="dashboard">
    <h2>Admin Dashboard</h2>
    <p>Total Orders: {{ totalOrders }}</p>
    <router-link to="/orders">View Orders</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalOrders: 0
    };
  },
  created() {
    this.fetchTotalOrders();
  },
  methods: {
    async fetchTotalOrders() {
      // Replace with your actual API endpoint to fetch the total orders
      const response = await fetch('/api/orders/count');
      const data = await response.json();
      this.totalOrders = data.count;
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}
</style>