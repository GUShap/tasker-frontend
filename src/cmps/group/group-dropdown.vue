<template>
  <section class="group-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <i class="fa fa-caret-down"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="showGroup">
          <i class="fas fa-compress-alt"></i>Collapse this group
        </el-dropdown-item>
        <el-dropdown-item
          ><i class="fas fa-compress-alt"></i>Collapse all
          groups</el-dropdown-item
        >
        <el-dropdown-item class="last-child"
          ><i class="far fa-check-square"></i>Select all items</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="fas fa-plus"></i>Add group</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="far fa-copy"></i>Duplicate group<i
            class="fas fa-angle-right"
          ></i
        ></el-dropdown-item>
        <el-dropdown-item class="last-child"
          ><i class="fas fa-arrow-right"></i>Move to<i
            class="fas fa-angle-right"
          ></i
        ></el-dropdown-item>
        <el-dropdown-item @click.native="setEdit"
          ><i class="fas fa-pen"></i>Rename group
        </el-dropdown-item>
        <el-dropdown-item class="last-child"
          ><i class="fas fa-arrows-alt-v"></i>Change group color
        </el-dropdown-item>
        <el-dropdown-item class="last-child"
          ><i class="far fa-file-excel"></i>Export to Excel
        </el-dropdown-item>
        <el-dropdown-item
          ><i class="fas fa-archive"></i>Archive
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeGroup"
          ><i class="fas fa-trash"></i>Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>



<script>
export default {
  name: "group-dropDown",
  methods: {
    removeGroup() {
      this.$emit("removeGroup");
    },
    showGroup() {
      this.$emit("showGroup");
    },
    setEdit() {
      console.log("hello");
      this.$emit("setEdit");
    },
  },
};
</script>