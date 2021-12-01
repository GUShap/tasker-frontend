<template>
  <section class="task-details"></section>
</template>

<script>
export default {
  name: "task-details",
  computed: {
    getTask() {
        const {taskId} = this.$route.params
    },
  },
};
</script>