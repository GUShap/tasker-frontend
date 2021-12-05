<template>
  <section class="group flex column align-center">
    <header class="group-header flex start align-center">
      <group-dropdown
        @removeGroup="removeGroup"
        @showGroup="showGroup"
        @setEdit="setEdit"
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
            v-on:keyup.enter="updateInfo"
            @blur="updateInfo"
          />
        </div>
        <div v-for="(cmp, idx) in cmpHeaders" :key="idx">
          {{ cmpHeader(cmp) }}
        </div>
        <!-- <div>Status</div>
        <div>Members</div> -->
      </section>
    </header>

    <!-- <button @click="removeGroup">x</button> -->
    <template v-for="task in currTasks">
      <transition name="fade" :key="task.id">
        <task-preview
          v-show="groupShow"
          :key="task.id"
          :task="task"
          :cmpsOrder="cmpsOrder"
          class="flex"
          @addTask="addTask"
        />
      </transition>
    </template>
    <transition>
      <section class="add-task color-marker" v-show="groupShow">
        <input
          type="text"
          placeholder="+Add"
          v-model="newTask"
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

export default {
  name: "board-group",
  components: {
    taskPreview,
    groupDropdown,
  },

  props: ["group"],
  data() {
    return {
      newTask: null,
      groupShow: true,
      isFocusOn: false,
      hover: false,
      cmpHeaders: null,
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
        this.$emit("addTask", { title: this.newTask, groupId: this.group.id });
        this.newTask = null;
      } else {
        this.$emit("addTask", {
          task,
          groupId: this.group.id,
        });
      }
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
  },
  computed: {
    currTasks() {
      this.tasks = this.group ? this.group.tasks : null;
      return this.tasks;
    },
    cmpsOrder() {
      const cmps = this.$store.getters.currBoard.cmpsOrder;
      this.cmpHeaders = cmps.slice(1);
      return cmps;
    },
  },
};
</script>