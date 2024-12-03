<template>
  <div class="dashboard-container">
    <h1>Welkom op het Dashboard</h1>
    <p>Je bent succesvol ingelogd!</p>
    <button @click="handleLogout">Uitloggen</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      localStorage.removeItem('token'); // Verwijder het token bij uitloggen
      this.$router.push('/login'); // Redirect naar de loginpagina
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
button {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: #c82333;
}
</style>