<template>
  <section class="workspace-container flex">
    <pop-up-nav
      class="pop-up-nav"
      :board="currBoard"
      :allBoards="boards"
      :user="loggedinUser"
    ></pop-up-nav>
    <section class="workspace">
      <board-header
        @screenCover="setInviteMode"
        :board="currBoard"
        :user="loggedinUser"
        :allBoards="boards"
        :allUsers="allUsers"
      />
      <div class="cover" v-if="isInviteMode" @click="setInviteMode(false)"></div>

      <div class="invite-container" v-if="isInviteMode">
        <ul class="invite-list">
          <span>Board Members</span>
          <p>Subscribe people from your team</p>
          <input type="text" placeholder="Enter name or email" />
          <li class="flex" v-for="currUser in allUsers" :key="currUser._id">
            <div class="user flex">
              <avatar
                class="memebr-img"
                :size="30"
                :src="
                  currUser.imgUrl ? require(`@/pics/${currUser.imgUrl}`) : null
                "
                :username="currUser.fullname"
              />
              <span>{{ currUser.fullname }}</span>
            </div>
            <div class="list-btn">
              <a class="icon-crown"></a>
              <i class="fas fa-times"></i>
            </div>
          </li>
        </ul>
      </div>
      <task-actions-nav @sortBy="sortBy" @addNewGroup="addNewGroup" />
      <board-filter />
      <board-details
        v-if="currBoard"
        :user="loggedinUser"
        :board="currBoard"
        @updateBoard="updateBoard"
        @addTask="addTask"
        @removeGroup="removeGroup"
        @addNewGroup="addNewGroup"
        @editGroup="editGroup"
      />
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import popUpNav from "@/cmps/pop-up-nav.vue";
import BoardDetails from "@/cmps/board/board-details.vue";

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardHeader,
    taskActionsNav,
    popUpNav,
    BoardDetails,
  },
  props: [],
  data() {
    return {
      boards: null,
      currBoardIdx: 0,
      user: 0,
      isInviteMode: false,
    };
  },
  async created() {
    try {
      this.$store.commit({ type: "setLoggedinUser" });
      this.boards = await this.$store.dispatch({
        type: "loadBoards",
        currBoardIdx: this.currBoardIdx,
      });
      this.users = await this.$store.dispatch({
        type: "loadUsers",
      });
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    updateBoard(board) {
      
      this.$store.commit({ type: "saveBoard", board });
    },

    async addTask(taskInfo) {
      try {
        // console.log("workspace", taskInfo);
        await this.$store.dispatch({ type: "editTask", taskInfo });
      } catch (err) {
        console.log("Error", err);
      }
    },
    async editGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "editGroup", groupInfo });
        console.log("Group was edited!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async removeGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "removeGroup", groupInfo });
        console.log("Group was deleted!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async addNewGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "addNewGroup", groupInfo });
        console.log("Group was add!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    sortBy(sortBy) {
      this.$store.commit({ type: "setSort", sortBy });
      // this.$store.dispatch({ type: "loadBoards" });
    },
    setInviteMode(isInvite) {
      this.isInviteMode = isInvite;
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
      // return this.$store.getters.sortedBoard;
    },
    loggedinUser() {
      this.user = this.$store.getters.loggedinUser;
      return this.user;
    },
    allBoards() {
      return this.$store.getters.allBoards;
    },
    allUsers() {
      return this.$store.getters.getUsers;
    },
  },
  destroyed() {},
};
</script>