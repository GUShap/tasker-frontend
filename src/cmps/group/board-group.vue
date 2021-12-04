<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <group-dropdown
        @removeGroup="removeGroup"
        @showGroup="showGroup"
        @setEdit="setEdit"
      />
      <i @click="showGroup" class="fa fa-caret-down"></i>
      <input
        class="input-group-name"
        :class="[isFocusOn ? 'border' : 'no-boder']"
        type="text"
        v-model="group.title"
        v-on:keyup.enter="updateInfo"
        @blur="updateInfo"
      />
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
import groupDropdown from "@/cmps/group/group-dropdown.vue";

export default {
  name: "board-group",
  components: {
    taskPreview,
    groupDropdown,
  },

  props: ["group"],
  data() {
    return {
      newTask: null,
      groupShow: true,
      isFocusOn: false,
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
    removeGroup() {
      this.$emit("removeGroup", { groupId: this.group.id });
    },
    setEdit() {
      this.isFocusOn = true;
    },
    updateInfo() {
      this.isFocusOn = false;
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