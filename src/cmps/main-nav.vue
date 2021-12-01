<template>
  <section class="main-nav">
    <nav class="flex column align-center">
      <router-link to="/home/" title="Home" class="fab fa-tumblr" />
      <router-link to="/board/" title="Workspace" class="fas fa-th-list" />
      <router-link to="/home" title="notification" class="far fa-bell" />
      <router-link to="/home/" title="e-mail" class="fas fa-inbox" />
      <router-link to="/home/" title="calender" class="far fa-calendar-check" />
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