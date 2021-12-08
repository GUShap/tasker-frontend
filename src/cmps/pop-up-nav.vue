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
          <h1>Workspace</h1>
        </div>
        <div class="action-btns">
          <el-select name="board" id="boards" v-if="currBoard" value="board">
            <el-option value="board1">{{ currBoard.title }}</el-option>
            <el-option value="board2">Board 2?</el-option>
          </el-select>
          <div class="search-btns">
            <button><span class="icon-plus"></span>Add new board</button>
            <button><span class="icon-filter"></span>Filter</button>
            <button><span class="icon-search last-child"></span>Search</button>
          </div>
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
  props: ["board", "user"],
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
  computed: {
    currBoard() {
      return this.board ? this.board : null;
    },
    currUser() {
      return this.user ? this.user : null;
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
