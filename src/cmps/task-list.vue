
<template>
  <section>
    <div class="task-list" v-for="task in tasks" :key="task.id">
      <task-dropdown />
      <task-preview :task="task" class="flex align-center justify-center" />
    </div>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task/task-preview.vue";

export default {
  name: "task-list",
  components: {
    taskPreview,
    taskDropdown,
  },
  props: ["tasks"],
};
</script>