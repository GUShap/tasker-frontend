<template>
  <section :class="[isWorkspace ? 'flex' : '']" class="main-app">
    <main-nav v-if="!isLandingPage" />
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
      isLandingPage: true,
      isWorkspace: false,
      isTaskDetails: null,
    };
  },
  created() {
    if (this.$route.name !== "workspace") {
      this.isWorkspace = true;
    }
    if (this.$route.name !== "landing-page") {
      this.isLandingPage = false;
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
