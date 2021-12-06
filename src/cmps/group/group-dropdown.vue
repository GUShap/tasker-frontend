<template>
  <section class="group-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <i
        class="fas fa-arrow-alt-circle-down"
        :style="{ color: group.style.color }"
      ></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="showGroup(true)">
          <i class="fas fa-compress-alt"></i>Collapse this group
        </el-dropdown-item>
        <el-dropdown-item class="last-child"
          ><i class="fas fa-compress-alt"></i>Collapse all
          groups</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="fas fa-plus"></i>Add group</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="far fa-copy"></i>Duplicate group</el-dropdown-item
        >
        <el-dropdown-item @click.native="setEdit"
          ><i class="fas fa-pen"></i>Rename group
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click="openColorModal"
          ><i
            class="fas fa-arrows-alt-v"
            :style="{ color: group.style.color }"
          ></i
          >Change group color
        </el-dropdown-item>
        <input
          type="color"
          @change="changeColor($event)"
          v-model="group.style.color"
        />
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
  props: ["group"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    removeGroup() {
      this.$emit("removeGroup");
    },
    showGroup(val) {
      this.$emit("showGroup", val);
    },
    setEdit() {
      this.$emit("setEdit");
    },
    openColorModal() {
      this.isOpen = true;
    },
    changeColor(ev) {
      const color = ev.target.value;
      this.$emit("changeColor",color);
    },
  },
};
</script>