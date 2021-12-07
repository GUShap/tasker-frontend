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
        <form @submit.prevent="login">
          <div class="input">
            <div class="input-email">
              <div class="labels email-label">
                <label class="label" for="email">Email</label>
              </div>
              <div class="email-container">
                <el-input class="email" v-model="user.email" type="email" />
              </div>
            </div>
            <div class="input-password">
              <div class="labels">
                <label class="label" for="password">Password</label>
              </div>
              <div>
                <el-input
                  class="password"
                  v-model="user.password"
                  type="password"
                />
              </div>
            </div>
            <router-link class="btn-login-page" to="/home"
              >Log in<i class="fas fa-arrow-right"></i
            ></router-link>
          </div>
        </form>
      </div>
      <div class="sign-in">
        <div class="line">___________<span>______________</span></div>
        <div class="register">Or Sign-in here</div>
        <div class="line">___________<span>______________</span></div>
      </div>
         <router-link class="btn-signin-page" to="/signin/">Sign in<i class="fas fa-arrow-right"></i></router-link>
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
      //       type: "login",
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