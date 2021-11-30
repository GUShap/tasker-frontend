<template>
  <section class="workspace-container">
    <header class="board-header">
      <div class="main-title">
        <i class="fas fa-share-alt"></i>
        <h2 @click="editTitle" v-show="!isEdited">{{ currBoard.title }}</h2>
        <input
          ref="title"
          v-show="isEdited"
          type="text"
          v-model="currBoard.title"
        />
        <i class="fas fa-info-circle" @click="toggleDetails"></i>
        <i
          class="far fa-star"
          :class="{ checked: isStared }"
          @click="stared"
        ></i>
      </div>
      <div class="more-actions">
        <a>Last seen</a>
        <a>Invite</a>
        <a>Activities</a>
        <i class="fas fa-plus"></i>
        <a>...</a>
      </div>
      <div v-show="isShown">{{ currBoard.details }}</div>
    </header>
    <board-filter />
    <!-- <board /> -->
  </section>
</template>

<script>
import { board } from "../../database.js";
import boardFilter from "@/cmps/board-filter.vue";
// import board from "@/cmps/board.vue";
export default {
  components: {
    boardFilter,
    board,
  },
  props: [],
  data() {
    return {
      isEdited: false,
      isShown: false,
      currBoard: board,
      isStared: false,
    };
  },
  created() {},
  methods: {
    editTitle() {
      this.isEdited = !this.isEdited;
      // saveToBoard()
    },
    toggleDetails() {
      this.isShown = !this.isShown;
    },
    stared() {
      this.isStared = !this.isStared;
      console.log("added");
    },
  },
  computed: {},
  destroyed() {},
};
</script>