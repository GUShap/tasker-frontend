
<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <group-dropdown
        :group="group"
        @removeGroup="removeGroup"
        @setEdit="setEdit"
        @changeColor="changeColor"
        @isShowGroups="isShowGroups"
        @duplicateGroup="duplicateGroup"
        @addNewGroup="addNewGroup"
      />
      <section
        class="column-headers"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <div>
          <i
            v-show="hover"
            @click="isShowGroups('switch')"
            :class="[
              groupShow ? 'fas fa-caret-square-up' : 'fas fa-caret-square-down',
            ]"
            style="padding-left: 10px; padding-right: 2px"
          />
          <i v-show="hover" class="group-drag-handle fas fa-grip-vertical" />
          <input
            class="input-group-name"
            type="text"
            v-model="group.title"
            @change="updateGroup"
            @keyup.enter="updateGroup"
            :style="{ color: group.style.color }"
          />
        </div>
        <div
          class="cpm-headers"
          v-for="(cmp, idx) in cmpsOrder"
          :key="idx"
          @click="setSort(cmpHeader(cmp)), toggleSortOrder()"
        >
          <!-- <i
            class="fas fa-sort"
            v-if="isToggleOn"
            @click="
              setSort(cmpHeader(cmp));
              toggleSortOrder();
            "
          ></i> -->
          {{ cmpHeader(cmp) }}
        </div>
      </section>
    </header>

    <draggable v-model="tasksList" class="single-task">
      <transition-group>
        <section
          v-for="(task, taskIdx) in tasksList"
          :key="task.id"
          style="
             {
              overflow: visible;
            }
          "
        >
          <transition name="fade" :key="task.id">
            <task-preview
              v-if="task"
              v-show="groupShow"
              :currentTask="task"
              :taskIdx="taskIdx"
              @addTask="addTask"
              :cmpsOrder="board.cmpsOrder"
              :groupIdx="groupIdx"
              :boardMembers="board.members"
              :markerColor="group.style.color"
              :user="loggedinUser"
              class="flex"
            />
          </transition>
        </section>
      </transition-group>
    </draggable>
    <transition>
      <section
        class="add-task"
        v-show="groupShow"
        :style="{ 'border-left': marker }"
      >
        <input
          type="text"
          placeholder="+ Add"
          v-model="title"
          @click="showBtn"
          @keyup.enter="addTask('new')"
        />
        <button class="btn-add-task" @click="addTask('new')" v-if="isSeen">
          Add
        </button>
      </section>
    </transition>
    <footer class="group-footer" />
  </section>
</template>


<script>
import taskPreview from "@/cmps/task/task-preview.vue";
import groupDropdown from "@/cmps/group/group-dropdown.vue";
import draggable from "vuedraggable";

export default {
  name: "board-group",
  components: {
    taskPreview,
    groupDropdown,
    draggable,
  },

  props: ["group", "board", "groupIdx", "user", "isGroupShown"],
  data() {
    return {
      currGroups: null,
      groupTitle: this.group.title,
      title: null,
      groupShow: true,
      cmpHeaders: null,
      markerColor: null,
      hover: false,
      isToggleOn: false,
      isFocusOn: false,
      isSeen: false,
      isDragStart: false,
      sortBy: {
        val: null,
        order: "ascending",
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  created() {},
  methods: {
    addTask(task) {
      if (task === "new") {
        if (!this.title) return;
        const newTask = { title: this.title };
        this.$emit("addTask", { task: newTask, groupIdx: this.groupIdx });
        this.title = null;
      } else {
        this.$emit("addTask", {
          task,
          groupId: this.group.id,
        });
      }
    },
    setSort(value) {
      const newSort = { ...this.sortBy };
      newSort.val = value.toLowerCase();
      this.$store.commit({ type: "setSort", sortBy: newSort });
    },
    duplicateGroup() {
      let groupCopy = JSON.parse(JSON.stringify(this.group));
      this.$emit("addNewGroup", { group: groupCopy, groupIdx: this.groupIdx });
    },
    toggleIconVisibility() {
      this.isToggleOn = !this.isToggleOn;
    },
    toggleSortOrder() {
      if (this.sortBy.order === "ascending") {
        this.sortBy.order = "descending";
      } else {
        this.sortBy.order = "ascending";
      }
    },
    changeColor(color) {
      console.log(color);
      this.markerColor = color;
      this.group.style.color = color;
      this.$emit("editGroup", { group: this.group, groupIdx: this.groupIdx });
    },
    showBtn() {
      this.isSeen = !this.isSeen;
    },
    dragTask(val) {
      if (typeof val === "string") {
        console.log("val", val);
        this.isDragStart = val;
      }
    },
    isShowGroups(val = null) {
      if (val === "switch") {
        this.groupShow = !this.groupShow;
        return;
      }

      if (!val.all) {
        this.groupShow = val.isShow;
      } else {
        this.$emit("isShowGroups", val);
      }
    },

    removeGroup() {
      console.log("groupIdx", this.groupIdx);
      this.$emit("removeGroup", { group: this.group, groupIdx: this.groupIdx });
    },
    addNewGroup() {
      this.$emit("addNewGroup", null);
    },
    setEdit() {
      this.isFocusOn = true;
    },

    async updateGroup() {
      console.log("group");
      try {
        this.isFocusOn = false;
        const currGroup = JSON.parse(JSON.stringify(this.group));
        const groupInfo = { group: currGroup, groupIdx: this.groupIdx };
        await this.$store.dispatch({
          type: "saveGroup",
          groupInfo,
        });
      } catch (err) {
        console.log(err);
      }
    },
    cmpHeader(val) {
      if (val === "status-picker") {
        return "Status";
      } else if (val === "member-picker") {
        return "Members";
      } else if (val === "timeline-picker") {
        return "Timeline";
      } else if (val === "priority-picker") {
        return "Priority";
      }
      return val;
    },
  },
  computed: {
    cmpsOrder() {
      return this.board.cmpsOrder.slice(1);
    },
    marker() {
      return `8px solid ${this.group.style.color}`;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
    tasksList: {
      set(value) {
        this.$store.commit("setTasksList", {
          groupIdx: this.groupIdx,
          tasksList: value,
        });
      },
      get() {
        return this.group.tasks;
      },
    },
  },
  watch: {
    isGroupShown: {
      handler: function (newVal) {
        console.log("newVal", newVal);
        this.groupShow = newVal.isShow;
      },
    },
  },
};
</script>