<template>
  <section class="workspace-container">
    <header class="board-header">
      <div class="main-title">
        <i class="fas fa-share-alt"></i>
        <a @click="editTxt('title')" v-show="!isEdited">{{
          currBoard.title
        }}</a>
        <input
          ref="title"
          v-show="isEdited && lableEdit === 'title'"
          type="text"
          v-model="currBoard.title"
        />
        <i class="fas fa-info-circle" @click="toggleDetails"></i>
        <i
          :class="[isStared ? 'fas fa-star' : 'far fa-star']"
          title="Stared"
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
    </header>
    <div class="board-info" @click="editTxt('description')" v-show="isShown">
      {{ currBoard.description }}
    </div>
    <input
      ref="description"
      v-show="isEdited"
      type="text"
      v-model="currBoard.description"
    />
    <board-filter />
    <board-cmp />
  </section>
</template>

<script>
import { board } from "../../database.js";
import boardFilter from "@/cmps/board-filter.vue";
import boardCmp from "@/cmps/board-cmp.vue";
export default {
  components: {
    boardFilter,
    boardCmp,
  },
  props: [],
  data() {
    return {
      isEdited: false,
      isShown: false,
      currBoard: board,
      isStared: false,
      lableEdit: false,
    };
  },
  created() {},
  methods: {
    editTxt(val) {
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