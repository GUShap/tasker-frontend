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
            :style="{ color: fontColor }"
            v-on:keyup.enter="updateInfo"
            @blur="updateInfo"
          />
        </div>
        <div v-for="(cmp, idx) in cmpHeaders" :key="idx">
          {{ cmpHeader(cmp) }}
        </div>
      </section>
    </header>

    <template v-for="task in currTasks">
      <transition name="fade" :key="task.id">
        <task-preview
          v-show="groupShow"
          :key="task.id"
          :task="task"
          :markerColor="markerColor"
          :cmpsOrder="cmpsOrder"
          class="flex"
          @addTask="addTask"
        />
      </transition>
    </template>
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
      console.log("label", val);
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
      this.markerColor = color;
    },
    showGroups(val) {
      console.log(val);
      this.$emit("showGroups", val);
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
      if (!this.markerColor) return `10px solid #579BFC`;
      return `10px solid ${this.markerColor}`;
    },
    fontColor() {
      if (!this.markerColor) return "#579BFC";
      return this.markerColor;
    },
  },
};
</script>