<template>
  <section class="sub-workspace flex" style="width: 100%">
    <section class="workspace-container">
      <board-header :board="currBoard" />
      <task-actions-nav />
      <board-filter />
      <board-details :board="currBoard" />
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import boardDetails from "@/cmps/board/board-details.vue";

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardDetails,
    boardHeader,
    taskActionsNav,
  },
  props: [],
  data() {
    return {
      boards: null,
      currBoardIdx: 0,
    };
  },
  async created() {
     this.boards = this.$store.dispatch({type: "loadBoards", currBoardIdx: this.currBoardIdx,
      });
  },
  methods: {},
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  destroyed() {},
};
</script>