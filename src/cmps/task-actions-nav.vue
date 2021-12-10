<template>
  <section>
    <section class="task-action-btn">
      <button @click="addNewGroup" class="btn-new-task">New Group</button>
      <button v-if="!isSearch" @click="isSearchMode">
        <label class="icon-search" form="search"></label>Search
      </button>
      <input
        @blur="isSearchMode"
        id="search"
        ref="search"
        @input="filterBy('searchKey')"
        v-show="isSearch"
        type="text"
        placeholder="Search"
        v-model="searchKey"
      />
      <button @click="showModal('filter')">
        <span class="icon-filter"></span>Filter<span
          class="icon-arrow-down"
        ></span>
      </button>
      <div v-if="isFilterBy" class="filter-menu">
        <div class="header flex space-between">
          <div>Quick filters</div>
          <div>Clear all</div>
        </div>
        <div>
          <div class="filter-options" v-if="board">
            <div class="member-avatars-filter">
              <h1>By members</h1>
              <div>
                <div
                  v-for="(user, idx) in allUsers"
                  :key="idx"
                  @click="filterBy({ filter: 'member', val: user.fullname })"
                >
                  <div class="user-container">
                    <img
                      class="member-img"
                      v-if="user.imgUrl"
                      :src="require(`@/pics/${user.imgUrl}`)"
                    />
                    <a v-else class="icon-user"></a>
                    {{ user.fullname }}
                  </div>
                </div>
              </div>
            </div>
            <div class="groups">
              <h1>By group</h1>
              <div
                @click.prevent.stop="filterBy({ filter: 'title', val: group.title })"
                class="group-title-container"
                v-for="(group, idx) in board.groups"
                :key="idx"
              >
                {{ group.title }}
              </div>
            </div>
            <div class="status">
              <h1>By status</h1>
              <div class="status-container">
                <div>
                  <span
                    class="icon-circle green"
                    value="done"
                    @click="filterBy({ filter: 'status', val: value })"
                  ></span
                  >Done
                </div>
                <div>
                  <span
                    class="icon-circle red"
                    value="stuck"
                    @click="filterBy({ filter: 'status', val: value })"
                  ></span
                  >Stuck
                </div>
                <div>
                  <span
                    class="icon-circle yellow"
                    value="working on it"
                    @click="filterBy({ filter: 'status', val: value })"
                  ></span
                  >Working on it
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="showModal('sort')">
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
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  name: "task-actions",
  props: ["allUsers", "board"],
  data() {
    return {
      isSearch: false,
      searchKey: "",
      isShown: false,
      isFilterBy: false,
      sortBy: {
        val: null,
        order: "ascending",
      },
    };
  },
  methods: {
    showModal(val) {
      if (val === "filter") {
        this.isFilterBy = !this.isFilterBy;
      }
      if (val === "sort") {
        this.isShown = !this.isShown;
      }
    },
    addNewGroup() {
      this.$emit("addNewGroup", null);
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
    isSearchMode() {
      this.isSearch = !this.isSearch;
    },
    filterBy(filter) {
      if (typeof filter === "object") {
        this.$emit("filterBy", filter);
      } else {
        this.$emit("filterBy", { filter: filter, val: this.searchKey });
      }
    },
  },
};
</script>
