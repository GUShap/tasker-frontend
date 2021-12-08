<template>
  <section
    v-if="task"
    class="task-details"
    @mouseover.self="pageHover(true)"
    @mouseleave="pageHover(false)"
  >
    <i class="fa fa-times" @click="exitModal"></i>
    <div class="details-title flex">
      <input placeholder="title" v-model="task.title" />
      <div class="users">
        <i class="fas fa-plus-circle"></i>
        <i class="fas fa-user-circle"></i>
      </div>
    </div>
    <div class="log-menu flex">
      <div class="nav-btn flex">
        <button
          class="flex"
          :class="{ underline: component === 'task-updates' }"
          @click="component = 'task-updates'"
          @mouseover="btnHover(true, 'updates')"
          @mouseleave="btnHover(false, null)"
        >
          updates
          <btn-dropdown
            class="dropdown-btn"
            v-if="isBtnHover && hoveredBtn === 'updates'"
          />
        </button>
        <!-- <button
          class="flex"
          :class="{ underline: component === 'task-files' }"
          @click="component = 'task-files'"
          @mouseover="btnHover(true,'files')"
          @mouseleave="btnHover(false, null)"
        >
          files<btn-dropdown v-if="isBtnHover && hoveredBtn === 'files'" />
        </button> -->
        <button
          class="flex"
          :class="{ underline: component === 'activity-log' }"
          @click="component = 'activity-log'"
          @mouseover="btnHover(true, 'log')"
          @mouseleave="btnHover(false, null)"
        >
          activity log<btn-dropdown v-if="isBtnHover && hoveredBtn === 'log'" />
        </button>
      </div>
    </div>
    <hr />
    <template>
      <component :is="component" :task="task" class="cmp-container"></component>
    </template>
  </section>
</template>

<script>
import taskUpdates from "@/cmps/task/details cmps/task-updates.vue";
import taskFiles from "@/cmps/task/details cmps/task-files.vue";
import activityLog from "@/cmps/task/details cmps/activity-log.vue";
import btnDropdown from "@/cmps/task/details cmps/btn-dropdown.vue";

export default {
  name: "task-details",
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
    btnDropdown,
  },
  data() {
    return {
      component: "task-updates",
      isBtnHover: false,
      hoveredBtn: null,
    };
  },
  methods: {
    exitModal() {
      this.pageHover(false);
      this.$router.push("/board");
    },

    btnHover(isHovered, val) {
      this.isBtnHover = isHovered;
      this.hoveredBtn = val;
    },

    pageHover(isHover) {
      this.$store.commit({ type: "hover", isHover });
    },
  },

  computed: {
    async task() {
      try {
        const { taskId } = this.$route.params;
      const task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
      })
      console.log(task);
      return task
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>