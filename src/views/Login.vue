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
    checkCookieName: function(name) {
      var match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        console.log("Found matching cookie: " + match[2]);
        return match[2];
      } else {
        console.log("--something went wrong---");
        return null;
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        try {
          const response = await login.post({
            username: this.email,
            password: this.password
          });

          let d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "Token=" + response.token + ";" + expires + ";path=/";

          const tokenCookie = this.checkCookieName("Token");
          console.log("COOKIE TOKEN: " + tokenCookie );

          if (tokenCookie != null) {
            console.log("cookie found");

            this.$router.push("/");
            // console.log("next: " + this.$route.params.nextUrl);
            // // this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
                this.$router.push("/");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>
