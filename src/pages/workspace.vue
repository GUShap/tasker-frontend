<template>
  <section class="sub-workspace flex">
    <pop-up-nav class="pop-up-nav"></pop-up-nav>
    <section class="workspace-container">
      <board-header :board="currBoard" />
      <task-actions-nav @addNewGroup="addNewGroup" />
      <board-filter />
      <board-details
        :board="currBoard"
        @addTask="addTask"
        @removeGroup="removeGroup"
      />
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import boardDetails from "@/cmps/board/board-details.vue";
import popUpNav from "@/cmps/pop-up-nav.vue";
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardDetails,
    boardHeader,
    taskActionsNav,
    popUpNav,
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
  methods: {
    async addTask(task) {
      try {
        await this.$store.dispatch({ type: "editTask", task });
        console.log("New task add!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async removeGroup(groupId) {
      try {
        await this.$store.dispatch({ type: "removeGroup", groupId });
        console.log("Group was deleted!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async addNewGroup() {
      try {
        await this.$store.dispatch({ type: "addNewGroup" });
        console.log("Group was add!");
      } catch (err) {
        console.log("Error", err);
      }
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  destroyed() {},
};
</script>