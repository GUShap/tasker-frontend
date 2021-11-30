<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <i @click="showGroup" class="fa fa-caret-down"></i>
      <div>{{ group.title }}</div>
    </header>

    <template v-for="task in group.tasks">
        <transition name="fade" :key="task.id">
      <task-preview :task="task" :key="task.id" v-show="groupShow" class="flex align-center justify-center"/>
        </transition>
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
    return {
      groupShow: true,
    };
  },
  created() {},
  methods: {
    showGroup() {
      this.groupShow = !this.groupShow;
    },
  },
  computed: {},
  destroyed() {},
};
</script>