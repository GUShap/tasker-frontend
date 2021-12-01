// delete this cmp??????




<template>
  <section class="group flex column align-center">
    <header class="group-header flex justify-center align-center">
      <font-awesome-icon icon="user-secret" />
      <div>{{ group.title }}</div>
    </header>
  
    <task-preview
      v-for="(task, idx) in group.tasks"
      :key="group.tasks[idx].id"
    >
      <div>{{ task.title }}</div>
    </task-preview>
    <footer class="group-footer flex justify-center align-center">

    </footer>
  </section>
</template>

<script>
import taskPreview from '@/cmps/task-preview.vue';

export default {
  components: {taskPreview},
  props: ["group"],
  data() {
    return {
    };
  },
  created() {
    
  },
  methods: {},
  computed: {},
  destroyed() {},
};
</script>