<template>
  <section class="status-picker" v-if="info">
    <div
      @click="editStatus('edit')"
      v-if="!isEditMode"
      class="status-picker empty"
      :class="priorityStyle"
      placeholder=""
    >
      {{ priority }}
      <img v-if="showDoneGif" />
    </div>
    <ul v-if="isEditMode" @blur="editStatus('edit')" class="status-modal">
      <li @click="editStatus('High')" class="high-bg">High</li>
      <li @click="editStatus('Medium')" class="medium-bg">Medium</li>
      <li @click="editStatus('Low')" class="low-bg">Low</li>
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
      priority: this.info.priority,
      priorityStyle: null,
      activity: null,
    };
  },
  created() {
    this.priorityStyle = this.info.priority ? this.info.priority.toLowerCase() : null;
  },
  methods: {
    editStatus(priority) {
      if (priority !== "edit") {
        this.priority = priority;
        this.priorityStyle = priority.toLowerCase();
      }
      this.isEditMode = !this.isEditMode;
    },
    update() {
      const updateInfo = {
        priority: this.priority,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
  },
  computed: {
  },
  watch: {
    priority: function (newVal, oldVal) {
      this.activity = { type: "priority", newVal, oldVal };
      this.update();
    },
  },
};
</script>