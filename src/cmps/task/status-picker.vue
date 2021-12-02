<template>
  <div class="status-picker">
    <div
      @click="editStatus"
      v-if="!edit"
      class="status-picker tag"
      :class="status"
      placeholder=""
    >
      {{ status }}
    </div>
    <ul v-if="edit" @blur="editStatus" class="status-modal">
      <li @click="editStatus('done')" class="tag done">Done</li>
      <li @click="editStatus('work')" class="tag work">Working on it</li>
      <li @click="editStatus('stuck')" class="tag stuck">Stuck</li>
      <li @click="editStatus"><button>Edit</button></li>
    </ul>
  </div>

  <!-- <el-select name="" id="" class="status-picker tag" v-model="status" :class="status" placeholder="">
  <option value="done" >Done</option>
      <el-option value="work">Working on it</el-option>
      <el-option value="stuck">Stuck</el-option>
      <el-option value="">Empty</el-option>
      </el-select> -->
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      edit: false,
      status: null,
    };
  },
  created() {
    this.status = this.info.labelId ? this.info.labelId : null;
  },
  methods: {
    editStatus(status = null) {
      if (status) this.status = status;
      this.edit = !this.edit;
    },
  },
  computed: {
    statusInfo() {
      this.status = this.info.labelId ? this.info.labelId : null;
    },
  },
  destroyed() {},
};
</script>