
<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <group-dropdown
        :group="group"
        @removeGroup="removeGroup"
        @showGroup="showGroup"
        @setEdit="setEdit"
        @changeColor="changeColor"
        @showGroups="showGroups"
        @duplicateGroup="duplicateGroup"
        @addNewGroup="addNewGroup"
      />
      <section class="column-headers">
        <div @mouseover="hover = true" @mouseleave="hover = false">
          <i
            @click="showGroup(false)"
            v-show="hover"
            :class="[
              groupShow ? 'fas fa-caret-square-up' : 'fas fa-caret-square-down',
            ]"
            style="padding-left: 10px; padding-right: 2px"
          />
          <i v-show="hover" class="group-drag-handle fas fa-grip-vertical" />
          <input
            class="input-group-name"
            :class="[isFocusOn ? 'border' : 'no-boder']"
            type="text"
            v-model="groupTitle"
            @change="updateGroup"
            @keyup.enter="updateGroup"
            :style="{ color: group.style.color }"
          />
        </div>
        <div v-for="(cmp, idx) in cmpsOrder" :key="idx">
          {{ cmpHeader(cmp) }}
        </div>
      </section>
    </header>
   

    <Container
      @drop="onTaskDrop(group.id, $event)"
      lock-axis="y"
      group-name="col"
      :get-child-payload="getChildPayload"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable
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
      </Draggable>
    </Container>
    <!-- @addTask="addTask(groupIdx, taskIdx, $event)"  -->

    <transition>
      <section
        class="add-task"
        v-show="groupShow"
        :style="{ 'border-left': marker }"
      >
        <input
          type="text"
          placeholder="+Add"
          v-model="title"
          @click="showBtn"
          @keyup.enter="addTask('new')"
        />
        <button class="btn-add-task" @click="addTask('new')" v-if="isSeen">
          Add
        </button>
      </section>
    </transition>
    <footer class="group-footer flex justify-center align-center"></footer>
  </section>
</template>


<script>
import taskPreview from "@/cmps/task/task-preview.vue";
import groupDropdown from "@/cmps/group/group-dropdown.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../../services/dnd.util.js";
import { utilService } from "@/services/util.service.js";

export default {
  name: "board-group",
  components: {
    taskPreview,
    groupDropdown,
    Container,
    Draggable,
  },

  props: ["group", "board", "groupIdx", "user"],
  data() {
    return {
      currGroups: null,
      // tasksList: this.group.tasks,
      title: null,
      groupShow: true,
      groupTitle: this.group.title,
      cmpHeaders: null,
      isFocusOn: false,
      markerColor: null,
      hover: false,
      isSeen: false,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  created() {},
  methods: {
    showGroup(val = null) {
      if (val) {
        this.groupShow = false;
      } else {
        this.groupShow = !this.groupShow;
      }
    },
    showBtn() {
      this.isSeen = !this.isSeen;
    },
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
    duplicateGroup() {
      let groupCopy = JSON.parse(JSON.stringify(this.group));
      delete groupCopy.id
      groupCopy.id = utilService.makeId();
      this.$emit("addNewGroup", { group: groupCopy, groupIdx: this.groupIdx });
    },
    changeColor(color) {
      console.log(color);
      this.markerColor = color;
      this.group.style.color = color;
      this.$emit("editGroup", { group: this.group, groupIdx: this.groupIdx });
    },
    showGroups(val) {
      this.$emit("showGroups", val);
    },
    removeGroup() {
      console.log("groupIdx", this.groupIdx);
      this.$emit("removeGroup", { group: this.group, groupIdx: this.groupIdx });
    },
    addNewGroup() {
      this.$emit("addNewGroup", {});
    },
    setEdit() {
      this.isFocusOn = true;
    },
    // updateInfo() {
      //   },
    async updateGroup() {
      try {
        this.isFocusOn = false;
        const currGroup = this.group;
        currGroup.title = this.groupTitle;
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
        return "Member";
      } else if (val === "timeline-picker") {
        return "Timeline";
      } else if (val === "priority-picker") {
        return "Priority";
      }
      return val;
    },

    async onTaskDrop(groupId, dropResult) {
      try {
        if (
          dropResult.removedIndex !== null ||
          dropResult.addedIndex !== null
        ) {
          const board = Object.assign({}, this.board);
          // const board = JSON.parse(JSON.stringify(this.board));
          const group = board.groups.filter((g) => g.id === groupId)[0];
          const groupIdx = board.groups.indexOf(group);
          const newGroup = Object.assign({}, group);
          // const newGroup = JSON.parse(JSON.stringify(group));
          const newTasks = Object.assign({}, newGroup.tasks);
          newGroup.tasks = applyDrag(newGroup.tasks, dropResult);
          board.groups.splice(groupIdx, 1, newGroup);
          console.log("board-group");
          await this.$store.dispatch({
            type: "saveBoard",
            board: board,
          });
        }
      } catch (err) {
        console.log("Error", err);
      }
    },
    getChildPayload(index) {
      return this.group.tasks[index];
    },
    onGroupDrop(dropResult) {
      this.currGroups = applyDrag(this.currGroups, dropResult);
      const groupsInfo = { groups: this.currGroups };
      this.$store.dispatch({
        type: "saveGroups",
        groupsInfo: groupsInfo,
      });
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
    tasksList() {
      return this.group.tasks;
    },
  },
  // watch: {
  //   group: function (newGroup, oldGroup) {
  //     this.tasksList = newGroup.tasks;
  //   },
  // },
};
</script>