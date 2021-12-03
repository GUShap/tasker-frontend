<template>
  <section :class="[isLandingPage ? '' : 'flex']">
    <main-nav v-if="!isLandingPage" />
    <!-- <main-nav /> -->
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
    };
  },
  created() {
    if (this.$route.name !== "landing-page") {
      this.isLandingPage = false;
    }
  },
  methods: {},
  computed: {},
  destroyed() {},
  watch: {
    $route: function (newVal, OldVal) {
      const { name } = newVal;
      console.log("watch route", name);
      if (name !== "landing-page") {
        this.isLandingPage = false;
      }
    },
  },
};
</script>
