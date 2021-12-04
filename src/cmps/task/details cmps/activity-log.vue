<template>
  <div class="activity-log">
    <ul>
      <li v-for="(activity, idx) in activities" :key="idx">
        <div class="activity-list flex">
            <i class="far fa-clock"><span>19h</span></i>
            <i class="fas fa-user-circle"></i>
            <p>{{activity.task.title}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "activity-log",
  computed: {
    activities() {
      return this.$store.getters.currBoard.activities;
    },
  },
};
</script>