<template>
  <section class="board-container" v-if="board">
    <template v-for="(group, groupIdx) in currGroups">
      <board-group
        :group="group"
        :user="loggedinUser"
        :key="group.id"
        :board="board"
        :groupIdx="groupIdx"
        @addTask="addTask"
        @showGroups="showGroups"
        @removeGroup="removeGroup"
        @editGroup="editGroup"
        @addNewGroup="addNewGroup"
        v-show="groupsShow"
      />
    </template>
  </section>
</template>

<script>
import boardGroup from "@/cmps/group/board-group.vue";

export default {
  name: "main-board",
  components: {
    boardGroup,
  },
  props: ["board", "user"],

  data() {
    return {
      groups: null,
      openModal: false,
      groupsShow: true,
    };
  },
  created() {},
  methods: {
    addTask(taskInfo) {
      // taskInfo.boardId = this.board._id;
      this.$emit("addTask", taskInfo);
    },
    editGroup(groupInfo) {
      this.$emit("editGroup", groupInfo);
    },
    removeGroup(groupInfo) {
      this.$emit("removeGroup", groupInfo);
    },
    showGroups(val = null) {
      // if (val) {
      //   const tasks = this.groups.map((group) => {
      //     return group.tasks;
      //   });
      //   return tasks;
      // }
    },
    addNewGroup(groupInfo) {
      // group.boardId = this.board._id;
      this.$emit("addNewGroup", groupInfo);
    },
  },
  computed: {
    currGroups() {
      return this.board.groups;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
  },
  destroyed() {},
};
</script>