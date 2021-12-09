<template>
  <section class="side-bar-expanded">
    <i
      @click="toggleNav"
      :class="[isShown ? 'fas fa-chevron-left' : 'fas fa-chevron-right']"
    ></i>
    <transition name="fade">
      <div
        class="side-nav-open flex column"
        :class="[isShown ? 'show' : 'hide']"
      >
        <div class="logo">
          <h1>Workspace</h1>
        </div>
        <div class="action-btns">
          <el-select name="board" id="boards" v-if="currBoard" value="board">
            <el-option value="board1">{{ currBoard.title }}</el-option>
            <el-option value="board2">Board 2?</el-option>
          </el-select>
          <div class="search-btns">
            <button @click="toggleModal">
              <span class="icon-plus"></span>Add new board
            </button>
            <button><span class="icon-filter"></span>Filter</button>
            <button><span class="icon-search last-child"></span>Search</button>
          </div>
        </div>
        <div class="my-boards">
          <button>My Boards</button>
          <ul v-if="allBoards">
            <li v-for="board in boards" :key="board._id" ></li>
          <button>{{board.title}}</button>
          </ul>
        </div>
      </div>
    </transition>
    <create-board v-if="isEditBoard" @addNewBoard="addNewBoard" @toggleModal="toggleModal"/>
  </section>
</template>



<script>
import { utilService } from "@/services/util.service.js";
import createBoard from "./create-board.vue";

export default {
  name: "pop-up-nav",
  props: ["board", "user","allBoards"],
  components: {
    createBoard,
  },
  data() {
    return {
      isShown: false,
      isEditBoard: false,
    };
  },

  created(){
    console.log(this.allBoards);
  },
  methods: {
    toggleNav() {
      this.isShown = !this.isShown;
    },
    toggleModal() {
      this.isEditBoard = !this.isEditBoard;

    },

    addNewBoard(board) {
      if (board) this.$store.dispatch({ type: "addNewBoard", board });
    },
    // createBoard(){
    //   const newBoard = utilService.getEmptyBoard()
    //   newBoard.createdBy=this.currUser
    //   this.$store.dispatch({type:"addNewBoard"})

    // }
  },
  computed: {
    currBoard() {
      return this.board ? this.board : null;
    },
    currUser() {
      return this.user ? this.user : null;
    },
    boards(){
      console.log(this.allBoards);
      return this.allBoards
    }
  },
};
</script>



<style>
.fade-enter-active,
.fade-leave-active,
.side-nav-open {
  transition: all 0.9s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
