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
          v-bind:style="{ width: percentage, 'background-color': marker }"
        ></div>
      </div>
    </section>
    <div v-if="edit" class="block timeline-modal">
      <el-date-picker
        v-model="timeline"
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
      timeline: '',
      txt: "-",
      hoverTxt: "-",
      hover: false,
      percentage: "0%",
      activity: null,
    };
  },
  created() {
    if(this.info.timeline){
      
      this.timeline=this.info.timeline.map(t=>Date(Date.now(t)));
    }
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
    update() {
      const updateInfo = {
        timeline: this.timeline,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
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
    timeline: function (newVal, oldVal) {
      if (newVal === "") return;
      console.log("newVal", newVal);
      const prevTxt = this.txt;
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

      if (typeof newVal[0] === "string") {
        newVal = newVal.map((time) => Date.now(time));
        console.log('newVal',newVal);
      }
      const currDate = new Date();
      const startMonth = monthNames[ new Date(newVal[0]).getMonth()];
      const startDay = new Date(newVal[0]);
      const endMonth = monthNames[new Date(newVal[1]).getMonth()];
      const endDay = new Date(newVal[1]);
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

      this.activity = {
        type: "timeline",
        newVal: `${startMonth} ${startDay.getDate()} - ${endMonth} ${endDay.getDate()}`,
        oldVal: prevTxt,
      };
      this.update();
    },
  },
};
</script>