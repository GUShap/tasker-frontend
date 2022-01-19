
<template>
  <section class="board-container" v-if="board">
    <draggable
      v-model="currGroups"
      group="people"
      @start="drag = true"
      @end="drag = false" 
      class="group-container"
    >
      <transition-group>
        <div
        class="single-group"
          v-for="(group, groupIdx) in currGroups"
          :key="groupIdx"
          style="
             {
              overflow: visible;
            }
          "
        >
          <board-group
            v-if="group && group.tasks"
            :group="group"
            :user="loggedinUser"
            :board="board"
            :groupIdx="groupIdx"
            :isGroupShown="isGroupShown"
            @isShowGroups="isShowGroups"
            @addTask="addTask"
            @removeGroup="removeGroup"
            @editGroup="editGroup"
            @addNewGroup="addNewGroup"
          />
        </div>
      </transition-group>
    </draggable>
  </section>
</template>

<script>
import boardGroup from "@/cmps/group/board-group.vue";
import { applyDrag } from "@/services/dnd.util.js";
import { socketService } from "@/services/socket.service.js";
import { utilService } from "@/services/util.service.js";
import draggable from "vuedraggable";

export default {
  name: "main-board",
  components: {
    boardGroup,
    draggable,
  },
  props: ["board", "user"],

  data() {
    return {
      isGroupShown: true,
      groups: null,
      openModal: false,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  created() {
    this.isShowGroups(true);
    socketService.emit("watch board", this.board._id);
  },
  mounted() {
    socketService.on("board updated", this.updateBoard);
  },
  methods: {
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },

    addTask(taskInfo) {
      this.$emit("addTask", taskInfo);
    },

    editGroup(groupInfo) {
      this.$emit("editGroup", groupInfo);
    },

    removeGroup(groupInfo) {
      this.$emit("removeGroup", groupInfo);
    },

    isShowGroups(val) {
      this.isGroupShown = val;
    },

    addNewGroup(groupInfo) {
      if (groupInfo) {
        const { group } = groupInfo;
        delete group.id;
        group.id = utilService.makeId();
        group.tasks.forEach((task) => (task.id = utilService.makeId()));
      }
      // console.log(groupInfo);
      this.$emit("addNewGroup", groupInfo);
    },
  },
  computed: {
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
    currGroups: {
      get() {
        return this.board.groups;
      },
      set(value) {
        this.$store.commit("setCurrGroups", {currGroups :value});
      },
    },
  },
  destroyed() {},
};
</script>