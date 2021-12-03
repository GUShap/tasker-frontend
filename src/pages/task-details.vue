<template>
  <section v-if="task" class="task-details">
    <i class="fa fa-times" @click="exitModal"></i>
    <div class="details-title flex">
      <input placeholder="title" v-model="task.title" />
      <div class="users">
        <i class="fas fa-plus-circle"></i>
        <i class="fas fa-user-circle"></i>
        <span>|</span>
      </div>
      <el-dropdown class="dropdown" trigger="click">
        <i class="fas fa-ellipsis-h"></i>
        <el-dropdown-menu trigger="click" size="large" slot="dropdown">
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-trash-alt"></i>Manage
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
      <button
        :class="{ underline: component === 'task-updates' }"
        @click="component = 'task-updates'"
      >
        updates
      </button>
      <button
        :class="{ underline: component === 'task-files' }"
        @click="component = 'task-files'"
      >
        files
      </button>
      <button
        :class="{ underline: component === 'activity-log' }"
        @click="component = 'activity-log'"
      >
        activity log
      </button>
      <div class="add-btn"><span>|</span> <button>+ add view</button></div>
    </div>
    <hr />
    <template>
      <component :is="component" :task="task"></component>
    </template>
  </section>
</template>

<script>
import taskUpdates from "@/cmps/task/details cmps/task-updates.vue";
import taskFiles from "@/cmps/task/details cmps/task-files.vue";
import activityLog from "@/cmps/task/details cmps/activity-log.vue";

export default {
  name: "task-details",
  components: {
    taskUpdates,
    taskFiles,
    activityLog,
  },
  data() {
    return {
      task: null,
      component: "task-updates",
    };
  },
  methods: {
    exitModal() {
      this.$router.push("/board");
    },
  },
  async created() {
    try {
      const { taskId } = this.$route.params;
      this.task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
      });
      // console.log("this.task", this.task);
    } catch (err) {
      console.log("Error", err);
    }
  },
  computed: {},
};
</script>