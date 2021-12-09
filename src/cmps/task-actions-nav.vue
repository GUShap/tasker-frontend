<template>
  <section>
    <section class="task-action-btn">
      <button @click="addNewGroup" class="btn-new-task">New Group</button>
      <button><span class="icon-search"></span>Search</button>
      <button>
        <span class="icon-filter"></span>Filter<span
          class="icon-arrow-down"
        ></span>
      </button>
      <div v-if="isFilterBy" class="filter-menu">
        <div>Quick filters</div>
        <div></div>
        </div>
      <button @click="showModal">
        <span class="icon-sort-up-down"></span>Sort
      </button>
    </section>
    <section class="pop-up-modal">
      <div class="menu-modal sort-menu" v-if="isShown">
        <div class="sort-header">
          <div class="sort-heading">Sort by</div>
          <div><i class="fas fa-times" @click="closeModal"></i></div>
        </div>
        <div class="sort-content">
          <div>
            <el-select
              v-model="sortBy.val"
              sortBy.val-key="value"
              placeholder="Select"
              class="sortVal"
            >
              <el-option value="name" @click.native="sortVal('name')"
                ><i class="fas fa-text-height"></i>Name</el-option
              >
              <el-option value="status" @click.native="sortVal('status')"
                ><i class="fas fa-layer-group"></i>Status</el-option
              >
              <el-option value="person" @click.native="sortVal('person')"
                ><i class="far fa-user-circle"></i>Person</el-option
              >
              <el-option value="timeline" @click.native="sortVal('timeline')"
                ><i class="fas fa-stream"></i>Timeline</el-option
              >
                <el-option value="priority" @click.native="sortVal('priority')"
                ><i class="fas fa-exclamation"></i>Priority</el-option
              >
            </el-select>
            
          </div>
          <div>
            <el-select
              v-model="sortBy.order"
              sortBy.order-key="value"
              placeholder="Select"
            >
              <el-option
                value="ascending"
                @click.native="sortOrder('ascending')"
                ><i class="fas fa-sort-amount-down-alt"></i>Ascending</el-option
              >
              <el-option
                value="descending"
                @click.native="sortOrder('descending')"
                ><i class="fas fa-sort-amount-up"></i>Descending</el-option
              >
            </el-select>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>



<script>
export default {
  name: "task-actions",
  data() {
    return {
      isShown: false,
      isFilterBy: false,
      sortBy: {
        val: null,
        order: "ascending",
      },
    };
  },
  methods: {
    showModal() {
      this.isShown = !this.isShown;
    },
    addNewGroup() {
      this.$emit("addNewGroup");
    },
    sortVal(value) {
      const newSort = { ...this.sortBy };
      newSort.val = value;
      this.$emit("sortBy", newSort);
    },
    sortOrder(value) {
      const newSort = { ...this.sortBy };
      newSort.order = value;
      this.$emit("sortBy", newSort);
    },
    closeModal() {
      this.isShown = !this.isShown;
    },
  },
};
</script>
