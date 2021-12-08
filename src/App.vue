<template>
  <section :class="[isLandingPage ? '' : 'flex']" class="main-app">
    <main-nav v-if="!isLandingPage" :user="loggedinUser" />
    <router-view />
    <div class="cover" v-if="isTaskDetailsHover"></div>
  </section>
</template>

<script>
import mainNav from "@/cmps/main-nav.vue";

export default {
  components: {
    mainNav,
  },
  props: [],
  data() {
    return {
      isLandingPage: null,
      isTaskDetails: null,
    };
  },
  created() {
    this.$store.commit({type:'setLoggedinUser'})
    if (this.$route.name === "landing-page" || this.$route.name === "login") {
      this.isLandingPage = true;
    }
  
  },
  methods: {
    detailsHover(isHovered) {
      this.isTaskDetailsHover = isHovered;
    },
  },
  computed: {
    isTaskDetailsHover() {
      return this.$store.getters.taskHover;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      console.log(user);
      return user;
    },
  },
  destroyed() {},
  watch: {
    $route: function (newVal, OldVal) {
      const { name } = newVal;
      if (name !== "landing-page") {
        this.isLandingPage = false;
      }
    },
  },
};
</script>
