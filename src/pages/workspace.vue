<template>
  <section class="sub-workspace flex">
    <pop-up-nav class="pop-up-nav"></pop-up-nav>
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
import popUpNav from "@/cmps/pop-up-nav.vue"

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardDetails,
    boardHeader,
    taskActionsNav,
    popUpNav
  },
  props: [],
  data() {
    return {
      boards: null,
      currBoardIdx: 0,
    };
  },
  async created() {
    this.boards = this.$store.dispatch({
      type: "loadBoards",
      currBoardIdx: this.currBoardIdx,
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