<template>
  <div class="login">
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" required />
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password }),
        });
        const result = await response.json();
        if (result.status === 'success') {
          localStorage.setItem('token', result.token);
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = result.message;
        }
      } catch (error) {
        this.errorMessage = 'Login failed. Please try again.';
      }
    },
  },
};
</script>