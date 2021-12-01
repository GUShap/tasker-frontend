<template>
  <section v-if="task" class="task-details modal">
  </section>
</template>

<script>
export default {
  name: "task-details",
  computed: {
    task() {
      const { taskId } = this.$route.params;
      if (!taskId) return
      const currTask = this.$store.dispatch({ type: 'getTaskById', taskId });
      return currTask;
    },
  },
};
</script>