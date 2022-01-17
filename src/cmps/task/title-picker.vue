<template>
  <section
    :style="{ 'border-left': this.info.marker }"
    v-if="info"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-picker flex"
    @click.prevent.stop="openDetails"
  >
    <div>
      <span v-if="!isEditMode">{{ currTitle }}</span>
      <input
        v-on:keyup.enter="editMode"
        @blur="
          {
            isEditMode = false;
          }
        "
        @change="onchange"
        v-else
        v-model="currTitle"
      />
      <button
        v-if="hover && !isEditMode"
        @click.stop.prevent="editMode"
        class="btn-edit"
      >
        Edit
      </button>
    </div>
    <button class="comment-bubble">
      <a class="icon-comment" :class="{ unseen: !isSeen }"></a>
      <a class="icon-plus" :class="{ unseen: !isSeen }"></a>
    </button>
    <!-- <button class="comment-bubble">
      <a class="icon-comment" :class="{ unseen: !isSeen }"></a>
      <a class="icon-plus" :class="{ unseen: !isSeen }"></a>
    </button> -->
  </section>
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      hover: false,
      isEditMode: false,
      currTitle: null,
      prevTitle: null,
      activity: null,
      debounce: null,
      isSeen: null,
      seenBy: null,
      members: null,
      user: null,
    };
  },
  created() {
    this.getInfo();
    // this.seenTask();
  },
  methods: {
    openDetails() {
      if (this.isEditMode) return;
      const info = this.currInfo;
      if (!info) return;
      else {
        if (
          !this.info.seenBy.some(
            (member) => member._id === this.loggedinUser._id
          )
        ) {
          this.info.seenBy.push(this.loggedinUser);
        }
        this.isSeen = true;
        // this.update();
        this.$router.push(`/board/task/${info.taskId}`).catch(() => {});
      }
    },

    editMode(val) {
      this.isEditMode = !this.isEditMode;
    },
    onchange() {
      clearTimeout(this.debounce);
      this.prevTitle = this.currTitle;
      this.debounce = setTimeout(() => {
        this;
        this.update();
      }, 800);
    },
    update() {
      this.prevTitle = this.currTitle;
      const updateInfo = {
        title: this.currTitle,
        activity: this.activity,
        seenBy: this.info.seenBy,
      };
      this.$emit("updated", updateInfo);
    },
    getInfo() {
      const task = this.currInfo;
      this.currTitle = task.title;
      this.prevTitle = task.title;
      this.seenBy = task.seenBy;
      this.members = task.members;
    },

    seenTask() {
      let isTaskMember = null;
      // if (!this.members || !this.members.length) return;

      let isSeenTask = this.seenBy.some(
        (member) => member._id === this.loggedinUser._id
      );
      if (!this.members || !this.members.length) isTaskMember = false;
      else {
        isTaskMember = this.members.some(
          (member) => member._id === this.loggedinUser._id
        );
      }
      if (!isTaskMember) this.isSeen = true;
      else if (isSeenTask) this.isSeen = true;
      else if (isTaskMember && !isSeenTask) {
        this.isSeen = false;
      }
    },
  },

  computed: {
    currInfo() {
      return this.info;
    },
    loggedinUser() {
      if (!this.$store.getters.loggedinUser)
        return { title: "Guest", _id: "1234" };
      return this.$store.getters.loggedinUser;
    },
  },
  watch: {
    currTitle: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activity = { type: "title", newVal, oldVal: this.prevTitle };
      }
    },
    info: {
      handler: function (newVal) {
        if (newVal && newVal.seenBy) {
          this.info.seenBy = newVal.seenBy;
          this.getInfo();
          this.seenTask();
        }
      },
    },
    isSeen: function () {
      this.update();
    },
    // isSeen:
  },
};
</script>