<template>
  <section class="task-container color-marker-after flex align-center">
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
      @duplicateTask="duplicateTask"
      @sortBy="sortBy"
    />
    <section
      class="task-preview flex align-center"
      :style="{ 'border-left': marker }"
    >
      <template v-for="(cmpType, idx) in cmpsOrder">
        <component
          @updated="updateTask(cmpType, $event)"
          :is="cmpType"
          :info="getCmpInfo(cmpType)"
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
import priorityPicker from "./priority-picker.vue";
import taskDropdown from "../task-dropdown.vue";
import { utilService } from "@/services/util.service.js";

export default {
  name: "task-preview",
  props:["markerColor"],
  components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    priorityPicker,
    taskDropdown,
  },
  props: [
    "currentTask",
    "taskIdx",
    "groupIdx",
    "cmpsOrder",
    "markerColor",
    "boardMembers",
  ],
  data() {
    return {
      task : this.currTask
    };
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
    sortBy(sortBy) {
      this.$emit("sortBy", sortBy);
    },
    openTaskDetails() {
      this.$router.push(`/board/task/${this.task.id}`);
    },
    duplicateTask() {
      let taskCopy = JSON.parse(JSON.stringify(this.task));
      delete taskCopy.id
      taskCopy.id = utilService.makeId();
      taskCopy.isCopy = true;
      this.$store.dispatch({
        type: "editTask",
        taskInfo: {
          task: taskCopy,
          groupIdx: this.groupIdx,
          taskIdx: this.taskIdx,
        },
      });
    },
    getCmpInfo(cmpType) {
      const currentTask =this.currTask
      switch (cmpType) {
        case "title-picker":
          return { taskId: currentTask.id, title: currentTask.title };
        case "member-picker":
          return { members: currentTask.members, boardMembers: this.boardMembers };
        case "status-picker":
          return { status: currentTask.status };
        case "timeline-picker":
          return { timeline: currentTask.timeline, markerColor: this.markerColor };
        case "priority-picker":
          return { priority: currentTask.priority};
      }
    },
    updateTask(cmpType, ev) {
      switch (cmpType) {
        case "title-picker":
          this.task.title = ev.title;
          break;
        case "member-picker":
          this.task.members = ev.members;
          break;
        case "status-picker":
          this.task.status = ev.status;
          break;
        case "timeline-picker":
          this.task.timeline = ev.timeline;
          break;
        case "priority-picker":
          this.task.priority = ev.priority;
          break;
      }

      const taskInfo = {
        task: this.task,
        groupIdx: this.groupIdx,
        taskIdx: this.taskIdx,
        activity: ev.activity,
      };
      this.$store.dispatch({
        type: "editTask",
        taskInfo,
      });
    },
  },
  computed: {
    marker() {
      if (!this.markerColor) return `8px solid #579BFC`;
      // console.log(this.markerColor)
      return `8px solid ${this.markerColor}`;
    },
    currTask(){
      return this.currentTask
    }

  },
  watch:{
    
  },
  destroyed() {},
};
</script>
