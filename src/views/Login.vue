<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
          autofocus
        />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div>
        <button type="submit" @click.prevent="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit: async function() {
      const user = {
        username: this.email,
        password: this.password
      };

      this.$store
        .dispatch("login", user)
        .then(() => {
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
