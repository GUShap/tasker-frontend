<template>
  <section :class="[isLandingPage ? '' : 'flex']" >
    <main-nav v-if="!isLandingPage" />
    <router-view style="margin-left: 3rem"/>
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
  created() {},
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
