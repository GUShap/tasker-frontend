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
  }
};
</script>
