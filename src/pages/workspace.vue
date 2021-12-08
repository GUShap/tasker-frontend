<template>
  <section class="workspace-container flex">
    <pop-up-nav
      class="pop-up-nav"
      :board="currBoard"
      :user="loggedinUser"
    ></pop-up-nav>
    <section class="workspace">
      <board-header :board="currBoard" :user="loggedinUser" />
      <task-actions-nav @sortBy="sortBy" @addNewGroup="addNewGroup" />
      <board-filter />
      <board-details
        :user="loggedinUser"
        @addTask="addTask"
        :board="currBoard"
        @removeGroup="removeGroup"
        @addNewGroup="addNewGroup"
        @editGroup="editGroup"
      />
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import popUpNav from "@/cmps/pop-up-nav.vue";
import BoardDetails from "@/cmps/board/board-details.vue";

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardHeader,
    taskActionsNav,
    popUpNav,
    BoardDetails,
  },
  props: [],
  data() {
    return {
      boards: null,
      currBoardIdx: 0,
    };
  },
  created() {
    this.boards = this.$store.dispatch({
      type: "loadBoards",
      currBoardIdx: this.currBoardIdx,
    });
  },
  methods: {
    async addTask(taskInfo) {
      try {
        await this.$store.dispatch({ type: "editTask", taskInfo });
        await this.$store.dispatch({ type: "updateUserLog", taskInfo });
      } catch (err) {
        console.log("Error", err);
      }
    },
    async editGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "editGroup", groupInfo });
        console.log("Group was edited!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async removeGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "removeGroup", groupInfo });
        console.log("Group was deleted!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async addNewGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "addNewGroup", groupInfo });
        console.log("Group was add!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    sortBy(sortBy) {
      this.$store.commit({ type: "setSort", sortBy });
      this.$store.dispatch({ type: "loadBoards" });
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
      // return this.$store.getters.sortedBoard;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
  },
  destroyed() {},
};
</script>