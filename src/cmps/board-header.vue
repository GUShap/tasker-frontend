<template>
  <section v-if="currBoard">
    <header class="board-header">
      <div class="main-title flex">
        <div class="board-info">
          <span class="filter1"></span>
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
          <a class="icon-info" @click="toggleDetails"></a>
          <a
            :class="[isStared ? 'icon-star-yellow' : 'icon-star']"
            title="Stared"
            @click="stared"
          ></a>
        </div>
        <div class="more-actions flex">
          <a>Board members </a>
          <div class="member-avatars">
            <section v-if="!allUsers">
              <avatar :size="25" username="i" />
            </section>
            <avatar
              class="member-img"
              v-else
              v-for="(user, idx) in board.members"
              :size="25"
              :username="user.fullname"
              :src="user.imgUrl ? require(`@/pics/${user.imgUrl}`) : null"
              :key="idx"
            />
          </div>
          <a @click="isInviteMode = true"
            ><span class="icon-invite"></span>Invite
          </a>
          <ul v-if="isInviteMode">
            <li v-for="currUser in allUsers" :key="currUser._id">
              <avatar
                class="memebr-img"
                :size="25"
                :username="currUser.fullname"
                :src="user.imgUrl ? require(`@/pics/${user.imgUrl}`) : null"
              />
              {{ currUser.fullname }}
            </li>
          </ul>
          <a><span class="icon-activities"></span>Activities</a>
          <a class="btn-add-board"><span class="icon-plus"></span>Add Board</a>
        </div>
      </div>

      <div class="input-section" @click="setEdit('description')">
        <input
          ref="description"
          type="text"
          v-model="currBoard.description"
          v-on:keyup.enter="updateInfo"
          @blur="updateInfo"
        />
      </div>
    </header>
    <section class="board-btns">
      <div class="board-action-btns">
        <button>
          <div>
            <span class="icon-main-table"></span><span class="icon-home"></span>
          </div>
          Table
        </button>
        <button><span class="icon-calender"></span>Calendar</button>
        <button><span class="icon-calender"></span>Chart</button>
        <button><span class="icon-kanban"></span>Kanban</button>
      </div>
      <div class="share"></div>
    </section>
  </section>
</template>


<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },
  name: "board-header",
  props: ["board", "user", "allUsers"],
  data() {
    return {
      isShown: true,
      isFocus: false,
      isStared: false,
      isInviteMode: false,
      currEditedVal: "",
      isEditedMode: false,
      invitedMembers: this.invitedMem,
    };
  },
  created() {
    console.log("allUsers", this.allUsers);
  },
  methods: {
    setEdit(val) {
      console.log(val);
      this.isFocus = true;
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
    getCmpInfo() {
      console.log({ members: this.board.members, boardMembers: this.allUsers });
      return { members: this.board.members, boardMembers: this.allUsers };
    },
  },
  computed: {
    currBoard() {
      return this.board ? this.board : null;
    },
    currUser() {
      return this.user ? this.user : null;
    },
    invitedMem() {
      return this.board.members ? this.board.member.length : null;
    },
  },
};
</script>
