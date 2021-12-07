<template>
  <section class="board-container" v-if="board">
    <template v-for="(group, groupIdx) in currGroups">
      <board-group
        :group="group"
        :key="group.id"
        :board="board"
        :groupIdx="groupIdx"
        @addTask="addTask"
        @showGroups="showGroups"
        @removeGroup="removeGroup"
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
  props: ["board"],

  data() {
    return {
      groups: null,
      openModal: false,
      groupsShow: true,
    };
  },
  created() {},
  methods: {
    addTask(task) {
      task.boardId = this.board._id;
      this.$emit("addTask", task);
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
      console.log(groupId);
    },
    showGroups(val = null) {
      // if (val) {
      //   const tasks = this.groups.map((group) => {
      //     return group.tasks;
      //   });
      //   return tasks;
      // }
    },
    addNewGroup(group) {
      group.boardId = this.board._id;
      this.$emit("addNewGroup", group);
    },
  },
  computed: {
    currGroups() {
      return this.board.groups;
    },
  },
  destroyed() {},
  watch: {
    $route: (newVal, oldVal) => {},
  },
};
</script>