
<template>
  <section class="task-preview flex align-center ">
    <task-dropdown />
  <section class="task-preview flex align-center">
    <template v-for="(cmpType, idx) in cmpsOrder">
      <component :is="cmpType" :info="task" :key="idx"/>
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
  methods: {},
  computed: {
    cmpsOrder() {
      return this.$store.getters.currBoard.cmpsOrder;
    },
  },
  destroyed() {},
};
</script>
