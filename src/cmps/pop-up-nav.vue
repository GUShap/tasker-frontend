<template>
  <section class="side-bar-expanded">
    <i 
      @click="toggleNav"
      :class="[isShown ? 'fas fa-chevron-left' : 'fas fa-chevron-right']"
    ></i>
    <transition name="fade">
      <div
        class="side-nav-open flex column"
        :class="[isShown ? 'show' : 'hide']"
      >
        <div class="logo">
          <a href="#/">Logo</a>
          <h1>My Workspace</h1>
        </div>

        <div class="action-btns">
          <button><i class="fas fa-plus"></i>Add</button>
          <button><i class="fas fa-filter"></i>Filter</button>
          <button><i class="fas fa-search"></i>Search</button>
        </div>
        <div class="my-boards">
          <button>My Boards</button>
        </div>
      </div>
    </transition>
  </section>
</template>



<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    toggleNav() {
      this.isShown = !this.isShown;
    },
  },
};
</script>



<style>
.fade-enter-active,
.fade-leave-active,
.side-nav-open {
  transition: all 0.9s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
