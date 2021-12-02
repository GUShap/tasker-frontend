<template>
  <section v-if="task" class="task-details">
    <i class="fa fa-times" @click="exitModal"></i>
    <div class="details-title flex">
      <input placeholder="task-title" />
      <div class="users">
        <i class="fas fa-plus-circle"></i>
        <i class="fas fa-user-circle"></i>
      </div>
      <span>|</span>

      <el-dropdown class="dropdown" trigger="click">
        <i class="fas fa-ellipsis-h"></i>
        <el-dropdown-menu trigger="click" size="large" slot="dropdown">
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-trash-alt"></i>Manage subscribers</el-dropdown-item
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
      <div class="item-btns flex">
        <button class="under-line">updates</button>
        <button>files</button>
        <button>activity log</button>
      </div>
      <button><span>|</span> + add view</button>
    </div>
    <hr />
  </section>
</template>

<script>
export default {
  name: "task-details",
  methods: {
    exitModal() {
      this.$router.push("/board");
    },
  },
  computed: {
    async task() {
      try {
        const { taskId } = this.$route.params;
        if (!taskId) return;
        const currTask = this.$store.dispatch({ type: "getTaskById", taskId });
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>