
<template>
  <section class="task-container color-marker-after flex align-center">
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
    />
    <section class="task-preview color-marker flex align-center">
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
import taskDropdown from "../task-dropdown.vue";

export default {
  name: "task-preview",
  components: { statusPicker, memberPicker, titlePicker, taskDropdown },
  props: ["task"],
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
  },
  computed: {
    cmpsOrder() {
      return this.$store.getters.currBoard.cmpsOrder;
    },
  },
  destroyed() {},
};
</script>
