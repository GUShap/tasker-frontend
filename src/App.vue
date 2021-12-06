<template>
  <section :class="[isLandingPage ? '' : 'flex']" class="main-app">
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
      isLandingPage: null,
      isTaskDetails: null,
    };
  },
  created() {
    console.log('$rout',this.$route.name);
      if (this.$route.name === "landing-page") {
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
  },
  destroyed() {},
  watch: {
    '$route': function (newVal, OldVal) {
      // console.log('newVal',newVal);
      const { name } = newVal;
      // console.log('name',name);
      if (name !== "landing-page") {
        this.isLandingPage = false;
      }
    },
  },
};
</script>
