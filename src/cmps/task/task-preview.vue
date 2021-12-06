
<template>
  <section
    class="task-container color-marker-after flex align-center"
    style="{border : 1px solid red }"
  >
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
      @clone="clone"
    />
    <section class="task-preview flex align-center">
      <template v-for="(cmpType, idx) in cmpsOrder">
        <component :is="cmpType" :info="task" :key="idx" />
        <!-- <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)" :key="idx"> -->
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
import { utilService } from "../../services/util.service.js";

export default {
  name: "task-preview",
  components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    taskDropdown,
  },
  props: ["task", "cmpsOrder"],
  data() {
    return {};
  },
  created() {},
  methods: {
    async removeTask() {
      try {
        this.$store.dispatch({ type: "removeTask", taskId: this.task.id });
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
  },
  computed: {},
  destroyed() {},
};
</script>
