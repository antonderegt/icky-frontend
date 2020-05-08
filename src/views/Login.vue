<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import login from "@/gateways/auth.js";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async handleSubmit(e) {
    e.preventDefault();
    if (this.password.length > 0) {
      try {
        const response = await login.post({
            username: this.email,
            password: this.password
        })
        console.log(response.token);
        // let is_admin = response.user.is_admin
        let is_admin = 0;
        // localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('jwt', response.token);

        if (localStorage.getItem('jwt') != null) {
          console.log(this.$route.params.nextUrl);
          this.$emit('loggedIn');
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          }
          else {
            if (is_admin == 1) {
              this.$router.push('admin');
            }
            else {
              this.$router.push('/');
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      }
    }
  }
}
</script>

