<template>
  <div class="home">
    <main-nav/>
    <router-view />
  </div>
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
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>
