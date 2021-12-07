<template>
  <section class="timeline-picker">
    <section @click="editStatus" class="timeline-picker">
      <span>{{ txt }}</span>
      <div class="myProgress">
        <div class="myBar" :style="{ width: percentage, 'backgroud-color': marker }"></div>
      </div>
    </section>
    <div v-if="edit" class="block timeline-modal">
      <el-date-picker
        v-model="value"
        @blur="editStatus"
        type="daterange"
        align="right"
        :start-placeholder="currDate()"
        end-placeholder="End Date"
        :default-value="Date.now()"
      >
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  props: ["info", "markerColor"],
  data() {
    return {
      edit: false,
      value: "",
      txt: "Dec 3 - 4",
      percentage: "10%",
    };
  },
  created() {
    this.members = this.info.timeline;
  },
  methods: {
    editStatus() {
      this.edit = !this.edit;
    },
    currDate() {
      const date = new Date();
      const currentYear = date.getFullYear();
      const today = date.getDate();
      const currentMonth = date.getMonth() + 1;
      return `${currentYear}-${currentMonth}-${today}`;
    },
  },
  computed: {
    marker() {
      if (!this.markerColor) return `#579BFC`;
      return `${this.markerColor}`;
    },
  },
  destroyed() {},
  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        const form = newVal[0];
        const to = newVal[1];
        console.log(form.slice(0, 4), to.slice(0, 4));
      }
    },
  },
};
</script>