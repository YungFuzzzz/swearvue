<template>
  <div class="password-change">
    <h2>Change Password</h2>
    <form @submit.prevent="changePassword">
      <div>
        <label for="current-password">Current Password</label>
        <input type="password" id="current-password" v-model="currentPassword" required />
      </div>
      <div>
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" v-model="newPassword" required />
      </div>
      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: ''
    };
  },
  methods: {
    async changePassword() {
      try {
        const response = await axios.put('/api/user/password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        });
        alert('Password changed successfully');
      } catch (error) {
        console.error("Password change failed:", error);
        alert('Failed to change password');
      }
    }
  }
};
</script>

<style scoped>
.password-change {
  max-width: 400px;
  margin: 0 auto;
}
</style>