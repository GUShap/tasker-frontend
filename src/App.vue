<template>
  <section :class="[isLandingPage || isHomePage ? '' : 'flex']">
    <main-nav v-if="!isLandingPage" />
    <router-view style="margin-left: 3rem" />
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
      isLandingPage: true,
      isHomePage: true,
    };
  },
  created() {
    console.log(this.$route.name);
    if (this.$route.name !== "landing-page") {
      this.isLandingPage = false;
      if (this.$route.name !== "home") {
        this.isHomePage = false;
      }
    }
  },
  methods: {},
  computed: {},
  destroyed() {},
  watch: {
    $route: function (newVal, OldVal) {
      const { name } = newVal;
      if (name !== "landing-page") {
        this.isLandingPage = false;
      }
      if (this.$route.name !== "home") {
        this.isHomePage = false;
      }
    },
  },
};
</script>
