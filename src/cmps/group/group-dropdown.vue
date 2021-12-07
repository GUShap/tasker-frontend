<template>
  <section class="group-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <a class="fas fa-caret-down" :style="{ 'background-color': color }"></a>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="showGroup(true)">
          <i class="fas fa-compress-alt"></i>Collapse this group
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click.native="showGroups(true)"
          ><i class="fas fa-compress-alt"></i>Collapse all
          groups</el-dropdown-item
        >
        <el-dropdown-item  @click.native="showGroup(false)"
          ><i class="fas fa-expand-alt"></i>Open group</el-dropdown-item
        >
            <el-dropdown-item class="last-child" @click.native="showGroups(false)"
          ><i class="fas fa-expand-alt"></i>Open all groups</el-dropdown-item
        >
        <el-dropdown-item @click.native="addNewGroup"
          ><i class="fas fa-plus"></i>Add group</el-dropdown-item
        >
        <el-dropdown-item @click.native="duplicateGroup"
          ><i class="far fa-copy"></i>Duplicate group</el-dropdown-item
        >
        <el-dropdown-item @click.native="setEdit"
          ><i class="fas fa-pen"></i>Rename group
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click.native="openColorModal">
          <span class="icon-circle" :style="{ color: color }"></span>
          Change group color
        </el-dropdown-item>
        <el-dropdown-item @click.native="removeGroup"
          ><i class="fas fa-trash"></i>Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="color-container" v-show="isShown">
      <div class="color darkGreen" @click="changeColor('#037f4')"></div>
      <div class="color green" @click="changeColor('#00c875')"></div>
      <div class="color yellowGreen" @click="changeColor('#9cd326')"></div>
      <div class="color beige" @click="changeColor('#cab641')"></div>
      <div class="color yellow" @click="changeColor('#ffcb00')"></div>
      <div class="color darkPurple" @click="changeColor('#784bd1')"></div>
      <div class="color purple" @click="changeColor('#a25ddc')"></div>
      <div class="color turquoise" @click="changeColor('#0086BE')"></div>
      <div class="color blue" @click="changeColor('#579bfc')"></div>
      <div class="color lightBlue" @click="changeColor('#66ccff')"></div>
      <div class="color darkRed" @click="changeColor('#bb3354')"></div>
      <div class="color red" @click="changeColor('#e2445c')"></div>
      <div class="color darkOrange" @click="changeColor('#ff642e')"></div>
      <div class="color orange" @click="changeColor('#fdab3d')"></div>
      <div class="color brown" @click="changeColor('#7f5347')"></div>
    </div>
  </section>
</template>



<script>
export default {
  name: "group-dropDown",
  props: ["group"],
  data() {
    return {
      isShown: false,
      color: "#579BFC",
    };
  },
  methods: {
    removeGroup() {
      this.$emit("removeGroup");
    },
    showGroup(val) {
      this.$emit("showGroup", val);
    },
    showGroups(val) {
      this.$emit("showGroups", val);
    },
    setEdit() {
      this.$emit("setEdit");
    },
    openColorModal() {
      this.isShown = !this.isShown;
    },
    changeColor(color) {
      this.color = color;
      this.$emit("changeColor", color);
      this.isShown = !this.isShown;
    },
    addNewGroup() {
      this.$emit("addNewGroup");
    },
    duplicateGroup() {
      this.$emit("duplicateGroup");
    },
  },
};
</script>