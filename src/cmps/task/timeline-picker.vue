<template>
  <section class="timeline-picker">
    <section
      @click="editStatus"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      class="timeline-picker"
    >
      <span v-if="!hover">{{ txt }}</span>
      <span v-else>{{ hoverTxt }}</span>
      <div class="myProgress">
        <div
          class="myBar"
        :style="{ width: percentage, 'background-color': marker }"
        ></div>
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
      txt: "-",
      hoverTxt: "-",
      hover: false,
      percentage: "0%",
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
      console.log(this.markerColor);
      return `${this.markerColor}`;
    },
  },
  destroyed() {},
  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const currDate = new Date();
        const startMonth = monthNames[newVal[0].getMonth()];
        const startDay = newVal[0];
        const endMonth = monthNames[newVal[1].getMonth()];
        const endDay = newVal[1];
        const diffTime = Math.abs(endDay - startDay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (startMonth === endMonth) {
          this.txt = `${startMonth} ${startDay.getDate()} - ${endDay.getDate()}`;
        } else {
          this.txt = `${startMonth} ${startDay.getDate()} - ${endMonth} ${endDay.getDate()}`;
        }
        this.hoverTxt = `${diffDays + 1} Day`;

        if (endDay < currDate) {
          this.percentage = "100%";
        } else if (currDate < startDay) {
          this.percentage = "0%";
        } else {
          this.percentage = `${
            (Math.abs(currDate - startDay) / (diffTime + 24 * 60 * 60 * 1000)) *
            100
          }%`;
        }
      }
    },
  },
};
</script>