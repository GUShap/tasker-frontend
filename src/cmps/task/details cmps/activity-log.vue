<template>
  <div class="activity-log">
    <ul>
      <li v-for="(activity, idx) in activities" :key="idx">
        <div class="activity-list flex">
            <i class="far fa-clock"><span>19h</span></i>
            <img class="user-img" :src="require(`@/pics/${activity.byMember.imgUrl}`)" />
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