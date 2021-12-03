<template>
  <section class="side-bar-expanded">
    <i class="fas fa-chevron-right" @click="toggleNav"></i>
    <div class="side-nav-open flex column" :class="[isShown ? 'show' : 'hide']">
      <a href="#/">Logo</a>
      <h1>My Workspace</h1>
      <!-- <el-select>
        <el-option value="bala">
          <input type="text" />
        </el-option>
        <el-option value="bala">Favorites</el-option>
        <el-option value="bala">Favorites</el-option>
        <el-option value="bala">Favorites</el-option>
      </el-select> -->
      <button>Add</button>
      <button>Filter</button>
      <button>Search</button>
      <div>
        <button>My Boards</button>
      </div>
    </div>
  </section>
</template>



<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    toggleNav() {
      this.isShown = !this.isShown;
    },
  },
};
</script>
