<template>
  <section class="main-nav">
    <nav class="page-nav">
      <router-link to="/home/" title="Home" class="fab fa-tumblr" />
      <router-link to="/board/" title="Workspace" class="fas fa-th-large" />
      <router-link to="/home/" title="notification" class="far fa-bell" />
      <router-link to="/home/" title="e-mail" class="fas fa-inbox" />
      <router-link to="/home/" title="calender" class="far fa-calendar-check" />
    </nav>
    <div class="side-msg">
      <span><i class="far fa-star"></i>See plans</span>
    </div>
    <nav class="user-nav">
      <router-link to="/cards/" class="fas fa-puzzle-piece"/>
      <router-link to="/home/" class="fas fa-user-plus"/>
      <router-link to="/home/" class="fas fa-search"/>
      <router-link to="/home/" class="fas fa-question"/>
      <router-link to="/home/" title="user" class="fas fa-user" />
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