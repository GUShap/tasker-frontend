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
          ></i>
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

    <template v-for="(task, taskIdx) in currTasks">
      <transition name="fade" :key="taskIdx">
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
    </template>
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

  props: ["group", "groupIdx"],
  data() {
    return {
      title: null,
      groupShow: true,
      isFocusOn: false,
      hover: false,
      cmpHeaders: null,
      markerColor: null,
      tasksList: null,
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
        const newTask = { title: this.title };
        this.$emit("addTask", { task: newTask, groupIdx: this.groupIdx });
        this.title = null;
      } else {
        this.$emit("addTask", task);
      }
    },
    changeColor(color) {
      this.markerColor = color;
      this.groupColor = color;
      this.$emit("editGroup", { group: this.group, groupIdx: this.groupIdx});
    },
    removeGroup() {
      console.log("groupIdx", this.groupIdx);
      this.$emit("removeGroup", { group: this.group, groupIdx: this.groupIdx });
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
    onDrop(collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult);

      this.taskList.map((t) => t.id);

      const groupInfo = { group: this.tasksList, groupIdx: this.groupIdx };
      this.$store.commit({
        type: "saveGroup",
        groupInfo: groupInfo,
      });
    },
    getChildPayload(index) {
      console.log("index", index);
      return this.taskList[index];
    },
  },
  computed: {
    currTasks() {
      this.taskList = this.group ? this.group.tasks : null;
      return this.taskList;
    },
    cmpsOrder() {
      const cmps = this.$store.getters.currBoard.cmpsOrder;
      this.cmpHeaders = cmps.slice(1);
      return cmps;
    },
    marker() {
      if (!this.markerColor) this.markerColor = "red";
      console.log(`1px solid ${this.markerColor}`);
      return `1px solid ${this.markerColor}`;
    },
  },
};
</script>