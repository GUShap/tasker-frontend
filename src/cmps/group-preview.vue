<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <i @click="taskShow" class="fa fa-caret-down"></i>
      {{ group.title }}
    </header>
    <template>
      <transition name="fade">
        <task-list v-show="showTask" :tasks="group.tasks" />
      </transition>
    </template>
    <footer class="group-footer flex justify-center align-center"></footer>
  </section>
</template>


<script>
import taskList from "@/cmps/task-list.vue";

export default {
  name: "group-preview",
  components: {
    taskList,
  },

  props: ["group"],
  data() {
    return {
      showTask: true,
    };
  },
  created() {},
  methods: {
    taskShow() {
      this.showTask = !this.showTask;
    },
  },
};
</script>