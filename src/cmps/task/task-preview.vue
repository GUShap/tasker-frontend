<template>
  <section
    class="task-container color-marker-after flex align-center"
    style="
       {
        border: 1px solid red;
      }
    "
  >
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
      @clone="clone"
    />
    <section
      class="task-preview flex align-center"
      :style="{ 'border-left': marker }"
    >
      <template v-for="(cmpType, idx) in cmpsOrder">
        <component
          :is="cmpType"
          :info="task"
          @update="updateTask"
          :key="idx"
          :markerColor="markerColor"
        />
      </template>
    </section>
  </section>
</template>

<script>
import titlePicker from "./title-picker.vue";
import statusPicker from "./status-picker.vue";
import memberPicker from "./member-picker.vue";
import timelinePicker from "./timeline-picker.vue";
import taskDropdown from "../task-dropdown.vue";

export default {
  name: "task-preview",
  components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    taskDropdown,
  },
  props: ["task", "taskIdx", "groupIdx", "cmpsOrder", "markerColor"],
  data() {
    return {};
  },
  created() {},
  methods: {
    async removeTask() {
      try {
        this.$store.dispatch({
          type: "removeTask",
          taskInfo: {
            task: this.task,
            taskIdx: this.taskIdx,
            groupIdx: this.groupIdx,
          },
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
    openTaskDetails() {
      this.$router.push(`/board/task/${this.task.id}`);
    },
    clone() {
      let task = this.task;
      let taskCopy = { ...task };
      delete taskCopy.id;
      this.$emit("addTask", taskCopy);
    },
    updateTask() {
      this.$store.dispatch({
        type: "editTask",
        taskInfo: {
          task: this.task,
          groupIdx: this.groupIdx,
          taskIdx: this.taskIdx,
        },
      });
    },
  },
  computed: {
    marker() {
      if (!this.markerColor) return `8px solid #579BFC`;
      return `8px solid ${this.markerColor}`;
    },
  },
  destroyed() {},
};
</script>
