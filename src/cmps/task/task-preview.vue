
<template>
  <section class="task-preview flex align-center">
    <template v-for="(cmpType, idx) in cmpsOrder">
      <!-- <div :key="idx">{{cmpType}}</div> -->
      <component :is="cmpType" :info="task" :key="idx"/>
      <!-- <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)" :key="idx"> -->
    </template>
  </section>
</template>

<script>
import titlePicker from "./title-picker.vue";
import statusPicker from "./status-picker.vue";
import memberPicker from "./member-picker.vue";

export default {
  name: "task-preview",
  components: {statusPicker, memberPicker, titlePicker},
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
