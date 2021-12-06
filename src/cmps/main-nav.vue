<template>
  <section class="main-nav">
    <nav class="page-nav">
      <router-link to="/home/" title="/Home/"
        ><span
          ><img class="logo-img" :src="require(`@/pics/logo-task.png`)" /></span
      ></router-link>
      <div class="pages">
        <router-link to="/board/" title="Workspace"
          ><span class="icon-workspace"></span
        ></router-link>
        <router-link
          to="/home/"
          title="notification"
          class="far fa-bell fa-lg"
        />
        <router-link
          to="/home/"
          title="calender"
          class="far fa-calendar-check"
        />
      </div>
    </nav>
    <div class="side-msg">
      <span class="icon-two-stars">See plans</span>
    </div>

    <nav class="user-nav">
      <!-- <span class="icon_component surface-item-icon icon_component--no-focus-style"></span> -->
      <router-link to="/cards/" class="fas fa-puzzle-piece" />
      <router-link to="/cards/" class="icon-add-user" />
      <router-link to="/cards/" class="icon-search" />
      <router-link to="/home/" class="far fa-user-circle" />
      <!-- <img src="https://cdn.monday.com/icons/dapulse-person-column.svg"> -->
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