
<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <group-dropdown
        :group="group"
        @removeGroup="removeGroup"
        @showGroup="showGroup"
        @setEdit="setEdit"
        @changeColor="changeColor"
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
            ref="title"
            type="text"
            v-model="group.title"
            :style="{ color: group.style.color }"
            v-on:keyup.enter="updateInfo"
            @blur="updateInfo"
          />
        </div>
        <div v-for="(cmp, idx) in cmpHeaders" :key="idx">
          {{ cmpHeader(cmp) }}
        </div>
      </section>
    </header>

    <Container
      @drop="onTaskDrop(group.id, $event)"
      lock-axis="y"
      group-name="tasks"
      :get-child-payload="getChildPayload"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable v-for="task in tasksList" :key="task.id">
        <transition name="fade" :key="task.id">
          <task-preview
            v-show="groupShow"
            :task="task"
            :markerColor="markerColor"
            :cmpsOrder="board.cmpsOrder"
            class="flex"
            @addTask="addTask"
          />
        </transition>
      </Draggable>
    </Container>

    <transition>
      <section class="add-task color-marker" v-show="groupShow">
        <input
          type="text"
          placeholder="+Add"
          v-model="title"
          @keyup.enter="addTask('new')"
        />
        <button class="btn-add-task" @click="addTask('new')">Add</button>
      </section>
    </transition>
    <footer class="group-footer flex justify-center align-center"></footer>
  </section>
</template>


<script>
// :group="group"
//   :key="group.id"
//   :groupIdx="groupIdx"
//   @addTask="addTask"
//   @removeGroup="removeGroup"

import taskPreview from "@/cmps/task/task-preview.vue";
import groupDropdown from "@/cmps/group/group-dropdown.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../../pages/card-helper.js";

export default {
  name: "board-group",
  components: {
    taskPreview,
    groupDropdown,
    Container,
    Draggable,
  },

  props: ["group", "board", "groupIdx"],
  data() {
    return {
      currGroups: null,
      tasksList: this.group.tasks,
      title: null,
      groupShow: true,
      cmpHeaders: null,
      markerColor: null,
      isFocusOn: false,
      hover: false,
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
      console.log("label", val);
      if (val) {
        this.groupShow = false;
      } else {
        this.groupShow = !this.groupShow;
      }
    },
    addTask(task) {
      if (task === "new") {
        if (!this.title) return;

        const newTask = {
          title: this.title,
        };

        this.$emit("addTask", newTask);

        this.title = null; //clear input
      } else {
        this.$emit("addTask", {
          task,
          groupId: this.group.id,
        });
      }
    },
    changeColor(color) {
      console.log(color);
      this.markerColor = color;
    },
    removeGroup() {
      this.$emit("removeGroup", { groupId: this.group.id });
    },
    setEdit() {
      this.$refs.title.focus();
      this.isFocusOn = true;
    },
    updateInfo() {
      this.isFocusOn = false;
    },
    cmpHeader(val) {
      if (val === "status-picker") return "Status";
      if (val === "member-picker") return "Member";
      return val;
    },

    // onTaskDrop(groupId, dropResult) {
    //   if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    //     this.tasksList = applyDrag( this.tasksList, dropResult);
    //     console.log("tasksList", this.tasksList.map(t=>t.id));
    //     return
    //     const groupInfo = { group: currGroup, groupIdx };
    //     this.$store.dispatch({
    //       type: "saveGroup",
    //       groupInfo: groupInfo,
    //     });
    //   }
    // },
    onTaskDrop(groupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = JSON.parse(JSON.stringify(this.board));
        const group = board.groups.filter((g) => g.id === groupId)[0];
        group.tasks = applyDrag(group.tasks, dropResult);
        // group.tasks  = applyDrag(this.tasksList, dropResult);
        board.groups.splice(this.groupIdx, 1, group);
        // const groupInfo = { group: currGroup, groupIdx };
        this.$store.dispatch({
          type: "saveBoard",
          board,
        });
      }
    },
    getChildPayload(index) {
      console.log('index',index);
      return this.group.tasks[index];
    },
    onGroupDrop(dropResult) {
      console.log("dropResult", dropResult);
      console.log("this", this);
      this.currGroups = applyDrag(this.currGroups, dropResult);
      const groupsInfo = { groups: this.currGroups };
      this.$store.dispatch({
        type: "saveGroups",
        groupsInfo: groupsInfo,
      });
    },
    // onDrop(dropResult) {
    //   console.log("dropResult", dropResult);
    //   this.tasksList = applyDrag(this.tasksList, dropResult);
    //   const groupCopy = JSON.parse(JSON.stringify(this.group));
    //   groupCopy.tasks = this.tasksList;
    //   const groupInfo = { group: groupCopy, groupIdx: this.groupIdx };
    //   this.$store.dispatch({
    //     type: "saveGroup",
    //     groupInfo: groupInfo,
    //   });
    // },
  },
  computed: {
    // taskList() {
    //   const taskList = this.group.tasks;
    //   this.currGroups = currGroups;
    //   return currGroups;
    // },
    // cmpsOrder() {
    //   const cmps = this.board.cmpsOrder;
    //   this.cmpHeaders = cmps.slice(1);
    //   return cmps;
    // },
    marker() {
      if (!this.markerColor) this.markerColor = "red";
      console.log(`1px solid ${this.markerColor}`);
      return `1px solid ${this.markerColor}`;
    },
  },
  watch: {
    group: function (newGroup, oldGroup) {
      this.tasksList = newGroup.tasks;
    },
  },
};
</script>