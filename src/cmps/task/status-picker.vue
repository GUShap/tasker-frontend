<template> 
    <!-- <div class="tag" :class="status">
      {{ status }}
    </div> -->
    <el-select name="" id="" v-model="status" :class="status">
      <el-option value="done">Done</el-option>
      <el-option value="stuck">Stuck</el-option>
      <el-option value="work">Working on it</el-option>
    </el-select>
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      status : null
    };
  },
  created() {
    this.status = this.info.labelId ? this.info.labelId : "";
  },
  methods: {},
  computed: {
    // status() {
    //   return this.info.labelId ? this.info.labelId[0] : "";
    // },
  },
  destroyed() {},
};
</script>