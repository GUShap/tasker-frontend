<template>
  <div class="activity-log">
      <ul>
          <li v-for="(activity, idx) in activities" :key="idx">{{activity}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "activity-log",
  computed: {
      activities(){
          return this.$store.getters.currBoard.activities
      }
  },
};
</script>