<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Login failed:", error);
        alert('Invalid credentials');
      }
    }
  }
};
</script>

<style scoped>
/* Basic styling for the login form */
.login {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 1rem;
}
</style>