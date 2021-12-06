<template>
  <section class="board-container" v-if="board">
    <template v-for="(group, groupIdx) in currGroups">
      <board-group
        :group="group"
        :key="group.id"
        :board="board"
        :groupIdx="groupIdx"
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
      console.log('label',this.board.groups.map(g=>g.tasks.map(t=>t.id)));
      return this.board.groups;
    },
  },
  destroyed() {},
  watch: {
    $route: (newVal, oldVal) => {},
  },
};
</script>