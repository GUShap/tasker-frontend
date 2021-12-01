<template>
  <section class="workspace-container">
    <board-header :board="currBoard" />
    <task-actions-nav />
    <board-filter />
    <board-cmp :board="currBoard" />
  </section>
</template>

<script>
import { board } from "../../database.js";
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import boardCmp from "@/cmps/board-cmp.vue";

export default {
  components: {
    boardFilter,
    boardCmp,
    boardHeader,
    taskActionsNav,
  },
  props: [],
  data() {
    return {
      // currBoard: board,
    };
  },
  async created() {
    try {
      await this.$store.dispatch("loadBoards");
    } catch (err) {
      console.log("loadBoards error:", err);
    }
  },
  methods: {
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  destroyed() {},
};
</script>