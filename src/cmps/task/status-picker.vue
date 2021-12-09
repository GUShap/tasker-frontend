<template>
  <section class="status-picker" v-if="info">
    <div
      @click="editStatus('edit')"
      v-if="!isEditMode"
      class="status-picker empty"
      :class="statusStyle"
      placeholder=""
    >
      {{ status }}
      <img v-if="showDoneGif" />
    </div>
    <ul v-if="isEditMode" @blur="editStatus('edit')" class="status-modal">
      <li @click="editStatus('Done')" class="done-bg">Done</li>
      <li @click="editStatus('Work')" class="work-bg">Working on it</li>
      <li @click="editStatus('Stuck')" class="stuck-bg">Stuck</li>
      <li @click="editStatus('Empty')" class="empty-bg">Empty</li>
      <!-- <li @click="editStatus"><button>Edit</button></li> -->
    </ul>
  </section>
</template>

<script>
export default {
  name: "status-picker",
  components: {},
  props: ["info"],
  data() {
    return {
      isEditMode: false,
      showDoneGif: false,
      status: this.info.status,
      statusStyle: null,
      activity: null,
    };
  },
  created() {
    this.statusStyle = this.info.status ? this.info.status.toLowerCase() : null;
  },
  methods: {
    editStatus(status) {
      if (status !== "edit") {
        this.status = status;
        this.statusStyle = status.toLowerCase();
      }
      if (status === "Done") {
        this.showDoneGif = true;
        setTimeout(() => {
          this.showDoneGif = false;
        }, 3000);
      }
      this.isEditMode = !this.isEditMode;
    },
    update() {
      const updateInfo = {
        status: this.status,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
  },
  computed: {
    statusInfo() {
      this.status = this.info.labelId ? this.info.labelId : null;
    },
  },
  watch: {
    status: function (newVal, oldVal) {
      this.activity = { type: "status", newVal, oldVal };
      this.update();
    },
  },
};
</script>