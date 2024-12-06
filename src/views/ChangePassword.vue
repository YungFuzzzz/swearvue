<template>
  <div class="change-password">
    <h1>Wijzig je Wachtwoord</h1>
    <form @submit.prevent="submitPasswordChange">
      <div class="form-group">
        <label for="oldPassword">Huidig Wachtwoord</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          required
          placeholder="Voer je huidige wachtwoord in"
        />
      </div>

      <div class="form-group">
        <label for="newPassword">Nieuw Wachtwoord</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          required
          placeholder="Voer een nieuw wachtwoord in"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Bevestig Nieuw Wachtwoord</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="Bevestig je nieuwe wachtwoord"
        />
      </div>

      <button type="submit" class="submit-btn">Wijzig Wachtwoord</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    submitPasswordChange() {
      if (this.newPassword !== this.confirmPassword) {
        alert('Nieuw wachtwoord en bevestiging komen niet overeen.');
        return;
      }
      
      console.log('Wachtwoord wijziging verzonden', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });
    },
  },
};
</script>

<style scoped>
.change-password {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.change-password h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
}

.submit-btn:focus {
  outline: none;
}
</style>