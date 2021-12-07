<template>
  <section class="login-page main-app">
    <nav class="login-nav">
      <h1>Tasker</h1>
    </nav>
    <div class="input-container flex">
      <div class="header">
        <h1><span>Log</span>In</h1>
      </div>
      <div class="submit-section">
        <form @submit.prevent="signup">
          <div class="input">
            <div class="input-email">
              <label class="label" for="email">Email</label>
              <el-input class="email" v-model="user.email" type="email" />
            </div>
            <div class="input-password">
              <label  class="label" for="password">Password</label>
              <el-input
                class="password"
                v-model="user.password"
                type="password"
              />
            </div>
            <router-link class="btn-login" to="/home"
              >Log in<i class="fas fa-arrow-right"></i
            ></router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signup() {
      console.log("hello");
      // this.$router.push("/-app");
      //   try {
      //     await this.$store.dispatch({
      //       type: "signup",
      //       user: this.user,
      //     });
      //     this.$router.push("/toy-app");
      //   } catch (err) {
      //     console.log(err);
      //   }
    },
  },
};
</script>