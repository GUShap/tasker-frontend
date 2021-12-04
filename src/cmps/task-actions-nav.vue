<template>
  <section>
    <section class="task-action-btn">
      <button class="new-task-btn">New Item</button>
      <button><i class="fas fa-search"></i>Search</button>
      <button><i class="far fa-user-circle"></i>Person</button>
      <button>
        <i class="fas fa-filter"></i>Filter<i class="fas fa-chevron-down"></i>
      </button>
      <button @click="showModal">
        <i class="fas fa-long-arrow-alt-up"></i
        ><i class="fas fa-long-arrow-alt-down"></i>Sort
      </button>
      <button><i class="fas fa-thumbtack"></i></button>
      <button><i class="far fa-eye-slash"></i></button>
      <button><i class="fas fa-sort-amount-up-alt"></i></button>
      <button><i class="fas fa-fill-drip"></i></button>
      <button><i class="far fa-edit"></i></button>
    </section>
    <section class="pop-up-modal">
      <div class="menu-modal sort-menu" v-if="isShown">
        <div class="sort-header">
          <div>Sort by</div>
          <div><button>Save to this view</button></div>
        </div>
        <div class="sort-content">
          <div>
            <el-select
              v-model="sortBy.val"
              sortBy.val-key="value"
              placeholder="Select"
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
          <div><i class="fas fa-times" @click="closeModal"></i></div>
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
    sortVal(value) {
      this.sortBy.val = value;
      this.$emit("sortBy", this.sortBy);
    },
    sortOrder(value) {
      this.sortBy.order = value;
      this.$emit("sortBy", this.sortBy);
    },
    closeModal() {
      this.isShown = !this.isShown;
    },
  },
};
</script>
