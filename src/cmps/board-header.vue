<template>
  <section v-if="currBoard">
    <header class="board-header">
      <div class="main-title flex">
        <div class="board-info">
          <i class="fas fa-share-alt"></i>
          <a
            class="board-title"
            @click="setEdit('title')"
            v-show="!isEditedMode || currEditedVal !== 'title'"
            >{{ currBoard.title }}</a
          >
          <input
            ref="title"
            v-show="isEditedMode && currEditedVal === 'title'"
            type="text"
            v-model="board.title"
            v-on:keyup.enter="updateInfo"
            @blur="updateInfo"
          />
          <i class="fas fa-info-circle" @click="toggleDetails"></i>
          <i
            :class="[isStared ? 'fas fa-star' : 'far fa-star']"
            title="Stared"
            @click="stared"
          ></i>
        </div>
        <div class="more-actions flex">
          <a>Last seen</a>
          <a>Invite</a>
          <a>Activities</a>
          <a class="add-board-btn">Add Board</a>
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>

      <div
        v-show="!isEditedMode || currEditedVal !== 'description'"
        @click="setEdit('description')"
        v-if="isShown"
      >
        {{ currBoard.description }}
        <input
          ref="description"
          v-show="isEditedMode && currEditedVal === 'description'"
          type="text"
          v-model="board.description"
          v-on:keyup.enter="updateInfo"
          @blur="updateInfo"
        />
      </div>
    </header>
    <section class="board-btns">
      <div class="board-action-btns">
        <button>
          <i class="fas fa-table"></i><i class="fas fa-home"></i>Main Table
        </button>
        <button><i class="far fa-chart-bar"></i>Calendar</button>
        <button><i class="far fa-chart-bar"></i>Chart</button>
        <button><i class="fas fa-table"></i>Table</button>

        <el-dropdown class="dropdown-style-opt" trigger="click">
          <a>More<i class="fas fa-chevron-down"></i></a>
          <el-dropdown-menu trigger="click" size="large" slot="dropdown">
            <el-dropdown-item
              ><i class="far fa-sticky-note"></i>Cards
            </el-dropdown-item>
            <el-dropdown-item
              ><i class="fab fa-wpforms"></i>Form</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="fab fa-trello"></i>Kanban</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <button><i class="fas fa-plus"></i>Add View</button>
      </div>
      <div class="share">
        <i class="fas fa-plug"></i>
        <h5>Integrate</h5>
        <!-- <div> -->
        <img
          class="icon-pic"
          style="max-width: 20px"
          :src="require(`@/pics/slack.png`)"
        />
        <img
          class="icon-pic"
          style="max-width: 20px"
          :src="require(`@/pics/gmail.png`)"
        />
        <img
          class="icon-pic"
          style="max-width: 20px"
          :src="require(`@/pics/twilio.jpg`)"
        />
        <!-- </div> -->

        <button>Automate</button>
        <!-- <button></button> -->
      </div>
    </section>
  </section>
</template>


<script>
export default {
  name: "board-header",
  props: ["board"],
  data() {
    return {
      isShown: true,
      isStared: false,
      currEditedVal: "",
      isEditedMode: false,
    };
  },
  methods: {
    setEdit(val) {
      console.log(val);
      //         focusInput() {
      //   this.$refs.input.focus()
      //   this.$refs.val.focus()
      // }
      this.isEditedMode = true;
      this.currEditedVal = val;
    },
    updateInfo() {
      this.isEditedMode = false;
      this.currEditedVal = null;
    },
    toggleDetails() {
      this.isShown = !this.isShown;
    },
    stared() {
      this.isStared = !this.isStared;
      console.log("added");
    },
  },
  computed: {
    currBoard() {
      return this.board ? this.board : null;
    },
  },
};
</script>
