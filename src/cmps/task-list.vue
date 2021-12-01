
<template>
  <section>
    <div v-for="task in tasks" :key="task.id">
      <task-preview
          :task="task"
          class="flex align-center justify-center"/>
    </div>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task-preview.vue";

export default {
  name: "task-list",
  components: {
    taskPreview,
  },
  props: ["tasks"],
};
</script>