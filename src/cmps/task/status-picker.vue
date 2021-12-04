<template>
  <div class="status-picker">
    <div
      @click="editStatus('edit')"
      v-if="!edit"
      class="status-picker tag"
      :class="statusStyle"
      placeholder=""
    >
      {{ status }}
    </div>
    <ul v-if="edit" @blur="editStatus('edit')" class="status-modal">
      <li @click="editStatus('Done')" class="tag done">Done</li>
      <li @click="editStatus('Work')" class="tag work">Working on it</li>
      <li @click="editStatus('Stuck')" class="tag stuck">Stuck</li>
      <li @click="editStatus"><button>Edit</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "status-picker",
  components: {},
  props: ["info"],
  data() {
    return {
      edit: false,
      status: this.info.labelId ? this.info.labelId : null,
      statusStyle: this.info.labelId ? this.info.labelId.toLowerCase() : null,
    };
  },
  created() {
    this.status = this.info.labelId ? this.info.labelId : null;
  },
  methods: {
    editStatus(status) {
      // console.log("status", status);
      if (status !== "edit") {
        this.status = status;
        this.statusStyle = status.toLowerCase();
      }
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