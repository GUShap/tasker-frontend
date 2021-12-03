<template>
     <el-dropdown class="dropdown" trigger="click">
        <i class="fas fa-ellipsis-h"></i>
        <el-dropdown-menu trigger="click" size="large" slot="dropdown">
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-star"></i>Add to my favorites</el-dropdown-item>
          <el-dropdown-item @click.native="removeTask"
            ><i class="fas fa-pencil-alt"></i>rename</el-dropdown-item>
          <el-dropdown-item @click.native="removeTask"
            ><i class="far fa-trash-alt"></i>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
</template>