<template>
  <section class="task-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <i class="fa fa-caret-down"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="openTaskDetails">
          <i class="fas fa-expand-alt"></i> Open Details
        </el-dropdown-item>
        <el-dropdown-item @click.native="clone" class="last-child"
          ><i class="far fa-copy"></i>Duplicate</el-dropdown-item>
        <el-dropdown-item 
          ><i class="fas fa-plus"></i>Create new item below
        </el-dropdown-item>
        <el-dropdown-item class="last-child"
          ><i class="fas fa-archive"></i>Archive
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-trash"></i>Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>



<script>
export default {
  name: "task-dropDown",
  prop: [],
  data() {
    return {};
  },
  methods: {
    removeTask() {
      this.$emit("removeTask");
    },
    openTaskDetails() {
      this.$emit("openTaskDetails");
    },
    clone() {
      this.$emit("clone");
    },
  },
};
</script>
