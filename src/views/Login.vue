<template>
  <div class="login-container">
    <h1>Admin Login</h1>
    <form @submit.prevent="handleLogin">
      <input
        type="text"
        v-model="username"
        placeholder="Gebruikersnaam"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Wachtwoord"
        required
      />
      <button type="submit">Inloggen</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Voor het tonen van foutmeldingen
    };
  },
  methods: {
    handleLogin() {
      // Simpele hardcoded admin credentials
      const adminCredentials = { username: 'admin', password: '1234' };

      if (
        this.username === adminCredentials.username &&
        this.password === adminCredentials.password
      ) {
        // Redirect naar de dashboard-pagina
        this.$router.push('/dashboard');
      } else {
        // Toon foutmelding
        this.errorMessage = 'Ongeldige gebruikersnaam of wachtwoord.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.login-container form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-container button {
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-container button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  text-align: center;
}
</style>