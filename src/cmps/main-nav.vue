<template>
  <section class="main-nav">
    <nav class="sub-nav">
      <router-link to="/home/" title="/Home/">
      <img class="logo-img" :src="require(`@/pics/logo-task.png`)"/>
      </router-link>
        <router-link to="/board/" title="Workspace"
          ><span class="icon-workspace"></span
        ></router-link>
        <router-link to="/home/" title="notification" class="far fa-bell" />
        <router-link
          to="/home/"
          title="calender"
          class="far fa-calendar-check"
        />    
    </nav>

    <div class="side-msg">
      <span class="icon-two-stars" v-if="user">Hello {{ user.fullname }}</span>
      <span class="icon-two-stars" v-else>Hello Guest</span>
    </div>

    <nav class="sub-nav">
      <!-- <span class="icon_component surface-item-icon icon_component--no-focus-style"></span> -->
      <router-link to="/home/" class="fas fa-puzzle-piece" />
      <router-link to="/home/" class="icon-add-user" />
      <router-link to="/home/" class="icon-search" />
      <i class="fas fa-sign-out-alt" @click="logout"></i>
      <router-link to="/home/" class="far fa-user-circle" />
      <!-- <img src="https://cdn.monday.com/icons/dapulse-person-column.svg"> -->
    </nav>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["user"],
  data() {
    return {};
  },
  created() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  computed: {},
  destroyed() {},
};
</script>