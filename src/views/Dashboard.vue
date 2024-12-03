<template>
  <div class="dashboard">
    <h1>Admin Dashboard</h1>
    <button @click="logout">Logout</button>
    <OrderList />
  </div>
</template>

<script>
import OrderList from '../components/OrderList.vue';

export default {
  components: { OrderList },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>