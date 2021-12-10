<template>
  <section class="board-container" v-if="board">
    <Container
      orientation="vertical"
      lock-axis="y"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".group-drag-handle"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable
        v-for="(group, groupIdx) in currGroups"
        :key="groupIdx"
        style="
           {
            overflow: visible;
          }
        "
      >
        <board-group
          v-if="group && group.tasks && group.tasks.length"
          :group="group"
          :user="loggedinUser"
          :board="board"
          :groupIdx="groupIdx"
          @addTask="addTask"
          @showGroups="showGroups"
          @removeGroup="removeGroup"
          @editGroup="editGroup"
          @addNewGroup="addNewGroup"
          v-show="groupsShow"
        />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import boardGroup from "@/cmps/group/board-group.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/services/dnd.util.js";
import { socketService } from "@/services/socket.service.js";
import { utilService } from "@/services/util.service.js";

export default {
  name: "main-board",
  components: {
    boardGroup,
    Container,
    Draggable,
  },
  props: ["board", "user"],

  data() {
    return {
      groups: null,
      openModal: false,
      groupsShow: true,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  created() {
    socketService.emit("watch board", this.board._id);
  },
  methods: {
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },

    addTask(taskInfo) {
      // taskInfo.boardId = this.board._id;
      this.$emit("addTask", taskInfo);
    },
    editGroup(groupInfo) {
      this.$emit("editGroup", groupInfo);
    },
    removeGroup(groupInfo) {
      this.$emit("removeGroup", groupInfo);
    },
    showGroups(val = null) {
      // if (val) {
      //   const tasks = this.groups.map((group) => {
      //     return group.tasks;
      //   });
      //   return tasks;
      // }
    },
    addNewGroup(groupInfo) {
      if (groupInfo) {
        const { group } = groupInfo;
        delete group.id;
        group.id = utilService.makeId();
      }
      console.log(groupInfo);
      this.$emit("addNewGroup", groupInfo);
    },

    async onColumnDrop(dropResult) {
      try {
        const currBoard = Object.assign({}, this.board);
        currBoard.groups = applyDrag(currBoard.groups, dropResult);
        console.log("board-details");
        await this.$store.dispatch({
          type: "saveBoard",
          board: currBoard,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
  },
  computed: {
    currGroups() {
      return this.board.groups;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
  },
  mounted() {
    socketService.on("board updated", this.updateBoard);
  },
  destroyed() {},
};
</script>