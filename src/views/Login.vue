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
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      username: '',
      password: '',
      socket: null,
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      if (!this.socket || !this.socket.connected) {
        console.error('Geen verbinding met de server.');
        this.errorMessage = 'Geen verbinding met de server.';
        return;
      }

      console.log('Login versturen:', { username: this.username, password: this.password });

      // Verstuur login event
      this.socket.emit('login', {
        username: this.username,
        password: this.password,
      });

      // Luister op login response
      this.socket.once('loginResponse', (response) => {
        console.log('Serverantwoord ontvangen:', response);

        if (response.success) {
          console.log('Login succesvol!');
          localStorage.setItem('token', response.token); // Sla het token op
          this.$router.push('/dashboard'); // Navigeer naar dashboard
        } else {
          console.error('Fout bij inloggen:', response.message);
          this.errorMessage = response.message || 'Login mislukt.';
        }
      });
    },
  },
  created() {
    // Verbinden met WebSocket-server op Render.com
    this.socket = io('https://swear-api-uhq5.onrender.com/', {
      transports: ['websocket'],
      reconnectionAttempts: 5, // Probeer opnieuw te verbinden indien nodig
    });

    // Luister op connectie-gebeurtenissen
    this.socket.on('connect', () => {
      console.log('Succesvol verbonden met de WebSocket-server:', this.socket.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Fout bij verbinden:', err.message);
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect(); // Verbreek de verbinding netjes
    }
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}
</style>