
<template>
  <section class="task-preview flex align-center space-between">
    <template v-for="(cmpType, idx) in cmpsOrder">
      <!-- <div :key="idx">{{cmpType}}</div> -->
      <component :is="cmpType" :info="task" :key="idx" />
      <!-- <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)" :key="idx"> -->
    </template>

    <!-- <input @change="change" type="text" name="" v-model="task.title" />
    <div v-for="(member, idx) in members" :key="idx">
      {{ member }}
    </div>
  <el-select v-model="labels">
      <el-option label="----" value="empty"></el-option>
      <el-option label="Working on it" value="working"></el-option>
      <el-option label="Done" value="done"></el-option>
      <el-option label="Stuck" value="stuck"></el-option>
    </el-select>
    <div>{{ task.labelIds }}</div>
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
