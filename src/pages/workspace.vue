<template>
  <section class="workspace-container">
    <board-header :currBoard="currBoard" />
    <task-actions-nav />
    <board-filter />
    <board-cmp />
  </section>
</template>

<script>
import { board } from "../../database.js";
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue"
import boardCmp from "@/cmps/board-cmp.vue";


export default {
  components: {
    boardFilter,
    boardCmp,
    boardHeader,
    taskActionsNav
  },
  props: [],
  data() {
    return {
      currBoard: board,
    };
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>