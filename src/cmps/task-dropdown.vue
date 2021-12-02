<template>
  <section>
    <el-dropdown class="dropdown" trigger="click">
      <i class="fa fa-caret-down"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="removeTask"
          ><i class="far fa-trash-alt"></i>Remove task</el-dropdown-item
        >
        <el-dropdown-item @click.native="toggleEditMode"
          ><i class="fas fa-pen"></i>Rename title</el-dropdown-item
        >
        <el-dropdown-item @click.native="duplicateTask"
          ><i class="far fa-copy"></i>Duplicate task</el-dropdown-item
        >
        <el-dropdown-item @click.native="openTaskDetails">
          <i class="fas fa-expand-alt"> Open Details </i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>



<script>
export default {
  name: "task-dropDown",
  data() {
    return {};
  },
  methods: {
    removeTask() {
      console.log("h");
    },
    duplicateTask() {
      console.log("b");
    },
  },
  openTaskDetails() {
    console.log("c");
  },
  toggleEditMode() {
    console.log("hello");
  },
};
</script>
