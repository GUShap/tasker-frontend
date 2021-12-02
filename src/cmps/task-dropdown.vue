<template>
  <section>
    <el-dropdown class="dropdown" trigger="click">
      <i class="fa fa-caret-down"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="openTaskDetails">
          <i class="fas fa-expand-alt"></i> Open Details
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
          ><i class="far fa-check-square"></i>Select item</el-dropdown-item
        >
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-long-arrow-alt-right"></i>Move to<i
            class="fas fa-angle-right"
          ></i
        ></el-dropdown-item>
        <el-dropdown-item @click.native="duplicateTask"
          ><i class="far fa-copy"></i>Duplicate<i class="fas fa-angle-right"></i
        ></el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-text-height"></i>Copy name</el-dropdown-item
        >
        <el-dropdown-item class="last-child" @click.native="removeTask"
          ><i class="fas fa-arrows-alt-h"></i>Copy Item link</el-dropdown-item
        >
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-pen"></i>Add subitems
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-arrows-alt-v"></i>Expand subitems
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
          ><i class="fas fa-level-down-alt"></i>Convert to subitems<i
            class="fas fa-angle-right"
          ></i>
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click.native="removeTask"
          ><i class="fas fa-plus"></i>Create new item below
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeTask"
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
};
</script>
