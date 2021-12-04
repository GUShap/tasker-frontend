<template>
  <div class="activity-log">
    <button>filter log<i class="fas fa-chevron-down"></i></button>

    <ul>
      <li v-for="(activity, idx) in activities" :key="idx">
        <div class="activity-list">
          <div class="log-time">
            <i class="far fa-clock"><span>19h</span></i>
          </div>
          <img
            class="user-img"
            :src="require(`@/pics/${activity.byMember.imgUrl}`)"
          />
          <p>{{ activity.task.title }}</p>
          <div class="type">
            <i :class="getType(activity.type)"></i>
            <span> {{ activity.type }}</span>
          </div>
          <div class="tag-container flex" v-if="activity.type === 'status'">
            <div class="log-tag log-stuck">stuck</div>
            <span><i class="fas fa-chevron-right"></i></span>
            <div class="log-tag log-done">done</div>
          </div>
          <div class="name-container flex" v-if="activity.type === 'name'">
            <div>old title</div>
            <span><i class="fas fa-chevron-right"></i></span>
            <div>new title</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "activity-log",
  data() {
    return {
      typeIcon: null,
    };
  },
  methods: {
    getType(val) {
      switch (val) {
        case "status":
          return "fas fa-bars";
        case "name":
          return "fas fa-text-height";
        case "member":
          return "far fa-user-circle";
      }
    },
  },
  computed: {
    activities() {
      return this.$store.getters.currBoard.activities;
    },
  },
};
</script>