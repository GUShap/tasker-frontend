<template>
  <section class="flex">
    <main-nav/>
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
    return {};
  },
  created() {

  },
  methods: {},
  computed: {
  },
  destroyed() {},
  watch:{
    //  $route (newVal, oldVal) {
    //    console.log('newVal',newVal);
    //    console.log('oldVal',oldVal);
    //   const { name } = this.$route;
    //   if (name === 'landing-page'){
    //     return false
    //   } else{
    //     return true
    //   }
    // },
  }
};
</script>
