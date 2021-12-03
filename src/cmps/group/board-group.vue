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
    <section class="add-task color-marker">
      <input
        type="text"
        placeholder="+Add"
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <button class="btn-add-task" @click="addTask">Add</button>
    </section>
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
      newTask: null,
      groupShow: true,
    };
  },
  created() {},
  methods: {
    showGroup() {
      this.groupShow = !this.groupShow;
    },
    addTask() {
      this.$emit("addTask", { title: this.newTask, groupId: this.group.id });
      this.newTask = null;
    },
  },
  computed: {
    currTasks() {
      this.tasks = this.group ? this.group.tasks : null;
      return this.tasks;
    },
  },
};
</script>