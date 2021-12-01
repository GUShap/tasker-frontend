<template>
  <section>
    <header class="board-header">
      <div class="main-title flex">
        <div class="board-info">
          <i class="fas fa-share-alt"></i>
          <a
            @click="setEdit('title')"
            v-show="!isEditedMode || currEditedVal !== 'title'"
            >{{ currBoard.title }}</a
          >
          <input
            ref="title"
            v-show="isEditedMode && currEditedVal === 'title'"
            type="text"
            v-model="currBoard.title"
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
        <div class="more-actions flex ">
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
        v-model="currBoard.description"
        v-on:keyup.enter="updateInfo"
        @blur="updateInfo"
      />
      </div>
    </header>
  </section>
</template>


<script>
export default {
  name: "board-header",
  props: ["currBoard"],
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
};
</script>
