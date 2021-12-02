<template>

  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <i @click="showGroup" class="fa fa-caret-down"></i>
      {{ group.title }}
    </header>
    <template v-for="task in currTasks">
      <transition name="fade" :key="task.id">
        <task-preview
          v-show="groupShow"
          :key="task.id"
          :task="task"
          class="flex"
        />
      </transition>
    </template>
    <footer class="group-footer flex justify-center align-center"></footer>
  </section>
</template>


<script>
import taskPreview from "@/cmps/task/task-preview.vue";

export default {
  name: "board-group",
  components: {
    taskPreview,
  },

  props: ["group"],
  data() {
    return {
      // group: null,
      groupShow: true,
    };
  },
  created() {},
  methods: {
    showGroup() {
      this.groupShow = !this.groupShow;
    },
  },
  computed: {
    currTasks() {
      this.tasks = this.group ? this.group.tasks : null;
      return this.tasks
    },
  },
};
</script>