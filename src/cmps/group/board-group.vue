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
      </section>
    </header>
    <Container
      :drop-placeholder="dropPlaceholderOptions"
      :get-child-payload="getChildPayload"
      group-name="1"
      @drop="onDrop('tasksList' , $event)"
    >
      <Draggable v-for="(task, $index) in currTasks" :key="$index">
        <transition name="fade" :key="task.id">
          <task-preview
            v-show="groupShow"
            
            :task="task"
            :cmpsOrder="cmpsOrder"
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

  props: ["group"],
  data() {
    return {
      title: null,
      groupShow: true,
      isFocusOn: false,
      hover: false,
      cmpHeaders: null,
      tasksList : null,
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
        this.$emit("addTask", { title: this.title, groupId: this.group.id });
        this.title = null;
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
    onDrop(collection, dropResult) {
      console.log('collection',collection);
      this[collection] = applyDrag(this[collection], dropResult);
    },
    getChildPayload(index) {
      console.log('index',index);
      return this.tasksList[index];
    },
  },
  computed: {
    currTasks() {
      if(!this.group) return
      if(!this.tasksList){
        this.tasksList =  this.group.tasks;
      }
      // console.log('this',this);
      //   console.log('currTasks',this.tasksList.map(t => t.id) )
      return this.tasksList;
    },
    cmpsOrder() {
      const cmps = this.$store.getters.currBoard.cmpsOrder;
      this.cmpHeaders = cmps.slice(1);
      return cmps;
    },
  },
};
</script>