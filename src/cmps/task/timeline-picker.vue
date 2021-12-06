<template>
  <div class="timeline-picker">
    <section v-if="!edit" @click="editStatus()">
      xxxx
    </section>
    <section v-else>
      <div class="block">
        <span class="demonstration">Start date time 12:00:00</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration"
          >Start date time 12:00:00, end date time 08:00:00</span
        >
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          align="right"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-time="['12:00:00', '08:00:00']"
        >
        </el-date-picker>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      members: null,
      edit: false,
       value1: '',
        value2: ''
    };
  },
  created() {
    this.members = this.info.timeline;
  },
  methods: {
    editStatus() {
      console.log('label');
      this.edit = !this.edit;
    },
  },
  computed: {
    membersInfo() {},
  },
  destroyed() {},
};
</script>