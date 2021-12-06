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
      <span>|</span>
      <el-dropdown trigger="click">
        <i class="fas fa-ellipsis-h"></i>
        <el-dropdown-menu trigger="click" size="large" slot="dropdown">
          <el-dropdown-item @click.native="removeTask"
            ><i class="fas fa-user-plus"></i>Manage
            subscribers</el-dropdown-item
          >
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-envelope"></i>Email preferences</el-dropdown-item
          >
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-file-excel"></i>Export to Excel</el-dropdown-item
          >
          <el-dropdown-item @click.native="removeTask"
            ><i class="fas fa-link"></i>Copy item link</el-dropdown-item
          >
          <el-dropdown-item @click.native="removeTask"
            ><i class="fas fa-archive"></i>Archive</el-dropdown-item
          >
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-trash-alt"></i>Delete</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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
      <span>|</span><button class="add-btn">+ add view</button>
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
      task: null,
      component: "task-updates",
      isBtnHover: false,
      hoveredBtn: null,
    };
  },
  methods: {
    exitModal() {
      this.pageHover(false)
      this.$router.push("/board");
    },

    btnHover(isHovered, val) {
      this.isBtnHover = isHovered;
      this.hoveredBtn = val;
    },

    pageHover(isHover) {
      this.$store.commit({type:"hover", isHover})
    },
  },

  async created() {
    try {
      const { taskId } = this.$route.params;
      this.task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
      });
    } catch (err) {
      console.log("Error", err);
    }
  },
};
</script>