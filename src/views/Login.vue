<template>
  <div class="login-container">
    <h1>Admin Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Gebruikersnaam</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Voer je gebruikersnaam in"
        />
      </div>
      <div class="form-group">
        <label for="password">Wachtwoord</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Voer je wachtwoord in"
        />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
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
    async handleLogin() {
      try {
        const response = await fetch('https://swear-api-uhq5.onrender.com/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.username, password: this.password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Login succesvol:', data);
          localStorage.setItem('token', data.data.token); // Save the token for further use
          this.$router.push('/dashboard'); // Redirect to the dashboard
        } else {
          console.error('Login mislukt:', data.message);
          this.errorMessage = data.message || 'Login mislukt. Controleer je gegevens.';
        }
      } catch (error) {
        console.error('Fout bij inloggen:', error);
        this.errorMessage = 'Er is een fout opgetreden bij het inloggen. Probeer het opnieuw.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #69ff47;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #2ffc01;
}
.error-message {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}
</style>
