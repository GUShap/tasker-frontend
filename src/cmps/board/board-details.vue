<template>
  <section class="board-container">
    <template v-for="group in currGroups">
      <board-group
        :group="group"
        :key="group.id"
        @addTask="addTask"
        @removeGroup="removeGroup"
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
    addTask(task) {
      task.boardId = this.board._id;
      this.$emit("addTask", task);
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
      console.log(groupId);
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