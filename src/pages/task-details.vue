<template>
    <!-- <div class="details-container"> -->
  <!-- <VueDragResize
  class="x"
      :isActive="true"
      :isDraggable="false"
      :w="400"
      
      :h="1020"
      :resizing="resize"
      :dragging="resize"
      :aspectRatio="false"
    > -->
  <div
    v-if="task"
    class="task-details"
    @mouseover.self="pageHover(true)"
    @mouseleave="pageHover(false)"
  >
      <i class="fa fa-times" @click="exitModal"></i>
      <div class="details-title flex">
        <input placeholder="title" v-model="task.title" @change="update" />
        <div class="users">
          <i class="fas fa-plus-circle"></i>
          <i class="fas fa-user-circle"></i>
        </div>
      </div>
      <div class="log-menu flex">
        <div class="nav-btn flex">
          <button
            class="flex"
            :class="{ underline: component === 'task-updates' }"
            @click="component = 'task-updates'"
            @mouseover="btnHover(true, 'updates')"
            @mouseleave="btnHover(false, null)"
          >
            updates
            <btn-dropdown
              class="dropdown-btn"
              v-if="isBtnHover && hoveredBtn === 'updates'"
            />
          </button>
          <button
            class="flex"
            :class="{ underline: component === 'activity-log' }"
            @click="component = 'activity-log'"
            @mouseover="btnHover(true, 'log')"
            @mouseleave="btnHover(false, null)"
          >
            activity log<btn-dropdown
              v-if="isBtnHover && hoveredBtn === 'log'"
            />
          </button>
        </div>
      </div>
      <hr />
      <template>
        <component
          :is="component"
          :task="task"
          :currBoard="currBoard"
          :loggedInUser="loggedInUser"
          class="cmp-container"
          @editTask="editTask"
        ></component>
      </template>

  <!-- </div> -->
  
    <!-- </VueDragResize> -->
    </div>
</template>

<script>
import { remoteBoardService } from "@/services/board.service-remote.js";
import taskUpdates from "@/cmps/task/details cmps/task-updates.vue";
import activityLog from "@/cmps/task/details cmps/activity-log.vue";
import btnDropdown from "@/cmps/task/details cmps/btn-dropdown.vue";
import VueDragResize from "vue-drag-resize";

export default {
  name: "task-details",
  components: {
    taskUpdates,
    activityLog,
    btnDropdown,
    VueDragResize,
  },
  data() {
    return {
      task: null,
      component: "task-updates",
      isBtnHover: false,
      hoveredBtn: null,

      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },

  async created() {
    try {
      const { taskId } = this.$route.params;
      if (this.task && this.task.id === taskId) return;
      const task = await this.$store.dispatch({
        type: "getTaskById",
        taskId,
      });
      this.task = task;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    exitModal() {
      this.pageHover(false);
      this.$router.push("/board");
    },

    btnHover(isHovered, val) {
      this.isBtnHover = isHovered;
      this.hoveredBtn = val;
    },
    update() {
      this.task;
      this.$store.dispatch({ type: "", task: this.task });
    },

    pageHover(isHover) {
      this.$store.commit({ type: "hover", isHover });
    },
    setTask(task) {
      this.task = task;
    },
    async editTask(task) {
      try {
        const boardIdx = this.$store.getters.currBoardIdx;
        const taskInfo = await remoteBoardService.getTaskRouteIdx(
          task,
          boardIdx
        );
        this.$store.dispatch({ type: "editTask", taskInfo });
      } catch (err) {
        console.log(err);
      }
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
  },
  computed:{
    loggedInUser(){
      if(this.$store.getters.loggedinUser) return 'Guest'
      return this.$store.getters.loggedinUser
    },

    currBoard(){
      return this.$store.getters.currBoard
    }
  },

  watch: {
    $route: async function (newVal) {
      try {
        const { taskId } = newVal.params;
        const task = await this.$store.dispatch({
          type: "getTaskById",
          taskId,
        });

        this.setTask(task);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>