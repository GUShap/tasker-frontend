<template>
  <section class="board-container">
    <template v-for="(group, groupIdx) in currGroups">
      <board-group
        :group="group"
        :key="group.id"
        :groupIdx="groupIdx"
        @addTask="addTask"
        @showGroups="showGroups"
        @removeGroup="removeGroup"
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
  },
  computed: {
    currGroups() {
      this.groups = this.board ? this.board.groups : null;
      return this.groups;
    },
  },
  destroyed() {},

  watch: {
    $route: (newVal, oldVal) => {},
  },
};
</script>