<template>
  <section class="task-container color-marker-after flex align-center">
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
      @duplicateTask="duplicateTask"/>
    <section
      class="task-preview flex align-center"
      :style="{ 'border-left': marker }"
    >
      <template v-for="(cmpType, idx) in cmpsOrder">
        <component
          :is="cmpType"
          :info="task"
          :boardMembers="members"
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
import { utilService } from "@/services/util.service.js";

export default {
  name: "task-preview",
  components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    taskDropdown,
  },
  props: ["task", "taskIdx", "groupIdx", "cmpsOrder", "markerColor", "members"],
  data() {
    return {};
  },
  created() {
    
  },
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
    duplicateTask() {
      
      let taskCopy = JSON.parse(JSON.stringify(this.task))
      taskCopy.id=utilService.makeId();
      taskCopy.isCopy = true
       this.$store.dispatch({
        type: "editTask",
        taskInfo: {
          task: taskCopy,
          groupIdx: this.groupIdx,
          taskIdx: this.taskIdx,
        },
      })
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
