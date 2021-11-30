<template>
  <section class="group flex column align-center">
    <header class="group-header flex justify-center align-center">
      <i class="fa fa-caret-down"></i>
      <div>{{ group.title }}</div>
    </header>

    <template v-for="task in group.tasks">
      <task-preview :task="task" :key="task.id"/>
    </template>
    <footer class="group-footer flex justify-center align-center"></footer>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task-preview.vue";

export default {
  components: { taskPreview },
  props: ["group"],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>