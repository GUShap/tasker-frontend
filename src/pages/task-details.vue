<template>
  <section v-if="task" class="task-details">
    <i class="fa fa-times" @click="exitModal"></i>
    <div class="details-title flex">
<<<<<<< HEAD
      <input placeholder="task-title" />
      <div class="title-btns flex">
=======
      <input placeholder="title" v-model="task.title" />
      <div class="users">
>>>>>>> f8780151c47b01c409dcaa933ceccf3287771eea
        <i class="fas fa-plus-circle"></i>
        <i class="fas fa-user-circle"></i>
        <span>|</span>

<<<<<<< HEAD
        <el-dropdown class="dropdown" trigger="click">
          <i class="fas fa-ellipsis-h"></i>
          <el-dropdown-menu trigger="click" size="large" slot="dropdown">
            <el-dropdown-item @click.native="removeTask"
              ><i class="far fa-trash-alt"></i>Manage
              subscribers</el-dropdown-item
            >
            <el-dropdown-item @click.native="removeTask"
              ><i class="far fa-envelope"></i>Email
              preferences</el-dropdown-item
            >
            <hr />
            <el-dropdown-item @click.native="removeTask"
              ><i class="far fa-file-excel"></i>Export to
              Excel</el-dropdown-item
            >
            <hr />
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
=======
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
>>>>>>> f8780151c47b01c409dcaa933ceccf3287771eea
    </div>
    <div class="log-menu flex">
      <button class="under-line">updates</button>
      <button>files</button>
      <button>activity log</button>
      <div class="add-btn">
        <span>|</span> <button>+ add view</button>
      </div>
    </div>
    <hr />
  </section>
</template>

<script>
export default {
  name: "task-details",
  data() {
    return {
      task: null,
    };
  },
  methods: {
    exitModal() {
      this.$router.push("/board");
    },
  },
  async created() {
    console.log('hi tom');
    try{
      const { taskId } =  this.$route.params;
      this.task = await this.$store.dispatch({
        type: "getTaskById",
        taskId: taskId,
      })
    console.log('this.task',this.task);
    }catch(err){
      console.log('Error',err);
    }
  },
  computed: {
  },
};
</script>