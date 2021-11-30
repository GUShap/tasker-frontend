<template>
  <section class="main-nav">
    <nav class="flex column align-center">
      <router-link to="/home" title="Home">
        <font-awesome-icon icon="home" class="fa"/>
      </router-link>
      <router-link to="/board/" title="Workspace">
        <font-awesome-icon icon="th-large" class="fa"/>
      </router-link>
    </nav>
  </section>
</template>

<script>
export default {
  components: {},
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