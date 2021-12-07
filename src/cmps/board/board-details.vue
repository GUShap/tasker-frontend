<template>
  <section class="board-container">
    <template v-for="(group, groupIdx) in currGroups">
      <board-group
        :group="group"
        :key="group.id"
        :groupIdx="groupIdx"
        @addTask="addTask"
        @removeGroup="removeGroup"
        @editGroup="editGroup"
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
  },
  computed: {
    currGroups() {
      this.groups = this.board ? this.board.groups : null;
      return this.groups;
    },
  },
  destroyed() {},
};
</script>