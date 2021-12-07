
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
            ref="title"
            type="text"
            v-model="group.title"
            :style="{ color: groupColor }"
            v-on:keyup.enter="updateInfo"
            @blur="updateInfo"
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
      <Draggable v-for="task in tasksList" :key="task.id">
        <transition name="fade" :key="task.id">
          <task-preview
            v-show="groupShow"
          :key="task.id"
          :task="task"
          :taskIdx="taskIdx"
          :markerColor="markerColor"
          :cmpsOrder="cmpsOrder"
          :groupIdx="groupIdx"
          class="flex"
          style="{'border-inline-left' : 1px solid red }"
          @addTask="addTask"
          />
        </transition>
      </Draggable>
    </Container>

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
      isSeen: false,
      groupColor: this.group.style.color,
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
      let group = this.group;
      let groupCopy = { ...group };
      delete groupCopy.id;
      this.$emit("addNewGroup", groupCopy);
    },
    changeColor(color) {
      this.markerColor = color;
      this.groupColor = color;
      this.$emit("editGroup", { group: this.group, groupIdx: this.groupIdx});
    },
    showGroups(val) {
      this.$emit("showGroups", val);
    },
    removeGroup() {
      console.log("groupIdx", this.groupIdx);
      this.$emit("removeGroup", { group: this.group, groupIdx: this.groupIdx });
    },
    addNewGroup() {
      this.$emit("addNewGroup");
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
      if (val === "timeline-picker") return "Timeline";
      return val;
    },

    onTaskDrop(groupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const group = board.groups.filter((g) => g.id === groupId)[0];
        const groupIdx = board.groups.indexOf(group);
        const newGroup = Object.assign({}, group);
        newGroup.tasks = applyDrag(newGroup.tasks, dropResult);
        board.groups.splice(groupIdx, 1, newGroup);
        this.$store.dispatch({
          type: "saveBoard",
          board,
        });
      }
    },
    getChildPayload(index) {
      console.log("index", index);
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
  },
  computed: {
    cmpsOrder() {
      return this.board.cmpsOrder.slice(1);
    },
    marker() {
      if (!this.markerColor) return `8px solid #579BFC`;
      return `8px solid ${this.markerColor}`;
    },
    fontColor() {
      if (!this.markerColor) return "#579BFC";
      return this.markerColor;
    },
  },
  watch: {
    group: function (newGroup, oldGroup) {
      this.tasksList = newGroup.tasks;
    },
  },
};
</script>