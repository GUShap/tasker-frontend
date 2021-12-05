<template>
  <section :class="[isWorkspace ? 'flex' : '']">
    <main-nav v-if="!isLandingPage" />
    <router-view />
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
      isWorkspace: false,
    };
  },
  created() {
    console.log(this.$route.name);
    if (this.$route.name !== "workspace") {
      this.isWorkspace = true;
    }
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
      if (name !== "landing-page") {
        this.isLandingPage = false;
      }
    },
  },
};
</script>
