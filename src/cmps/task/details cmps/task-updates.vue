<template>
  <section class="task-updates flex">
    <input
      v-if="!isEditMode"
      type="text"
      placeholder="Write an update..."
      @focus="setEdit"
    />

    <form v-if="isEditMode" @submit.prevent="saveComment" @blur="setEdit">
      <div class="comment-form">
        <div class="text-edit">
          <i class="fas fa-bold" @click.prevent="changeStyle('bold')"></i>
          <i class="fas fa-italic" @click.prevent="changeStyle('italic')"></i>
          <i
            class="fas fa-underline"
            @click.prevent="changeStyle('underline')"
          ></i>
          <i
            class="fas fa-strikethrough"
            @click.prevent="changeStyle('strikethrough')"
          ></i>
        </div>
        <hr />
        <div class="comment-input">
          <input
            type="text"
            v-model="input"
            ref="input"
            :style="{ changeStyle }"
          />
        </div>
      </div>

      <div class="actions-footer flex">
        <div class="text-edit flex">
          <button><span class="icon-clip"></span> add files</button>
          <emoji-picker @emoji="insert" :search="search">
            <div
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
              <button type="button">
                <span class="far fa-smile"></span> Emoji
              </button>
            </div>
            <div
              class="emoji-picker"
              slot="emoji-picker"
              slot-scope="{ emojis, insert }"
            >
              <div>
                <div class="emoji-search">
                  <input type="text" v-model="search" placeholder="search" />
                  <i class="fas fa-search"></i>
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div>
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                        >{{ emoji }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
          <button>@ mention</button>
        </div>
        <button class="save-btn">Update</button>
      </div>
    </form>
    <a href="#" v-if="!isEditMode"
      ><i class="far fa-envelope"></i>Write updates via email:</a
    >
    <ul>
      <li v-for="(comment, idx) in task.comments" :key="idx">
        <div class="update-card">
          <div class="top">
            <div class="card-btn">
              <i class="far fa-clock"
                ><time-stamp :time="comment.createdAt"
              /></i>
              <i class="far fa-bell"></i>
              <el-dropdown class="dropdown" trigger="click">
                <i class="fas fa-sort-down"></i>
                <el-dropdown-menu
                  class="dropdown-menu"
                  trigger="click"
                  size="large"
                  slot="dropdown"
                >
                  <el-dropdown-item @click.native="removeTask"
                    ><i class="fas fa-thumbtack"></i>Pin to
                    top</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeTask"
                    ><i class="fas fa-pencil-alt"></i>Edit
                    update</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="user-info">
              <div class="flex">
                <img
                  class="user-img"
                  :src="require(`@/pics/${comment.byMember.imgUrl}`)"
                />
                <h3>{{ comment.byMember.fullname }}</h3>
              </div>
              <p>{{ comment.txt }}</p>
            </div>
            <div class="watchers">
              <i class="far fa-eye"></i>
              <p>2 seen</p>
            </div>
          </div>
          <div class="action-btn flex">
            <div>
              <button><i class="far fa-thumbs-up"></i>like</button>
            </div>
            <div>
              <button @click="replyMode">
                <i class="fas fa-reply"></i>reply
              </button>
            </div>
            <input
              type="text"
              v-if="isReplyMode"
              ref="reply"
              @change="addReply"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { EmojiPicker } from "vue-emoji-picker";
import { boardService } from "@/services/board.service.js";
import timeStamp from "./time-stamp.vue";

export default {
  name: "task-updates",
  props: ["task"],
  components: {
    EmojiPicker,
    timeStamp,
  },
  data() {
    return {
      isEditMode: false,
      isReplyMode: false,
      newComment: null,
      input: "",
      search: "",
      style: null,
    };
  },
  created() {
    this.newComment = boardService.getEmptyComment();
  },
  methods: {
    insert(emoji) {
      this.input += emoji;
    },
    saveComment() {
      this.newComment.txt = this.$refs.input.value;
      if (!this.task.comments) this.task.comments = [];
      this.task.comments.push(this.newComment);
      this.$emit("editTask", this.task);
      this.setEdit();
    },
    setEdit() {
      this.isEditMode = !this.isEditMode;
    },
    changeStyle(style) {
      if (style === "bold")
        return (this.newComment.style = "font-weight: bold; ");
      if (style === "italic")
        return (this.newComment.style = "font-style: italic; ");
      if (style === "underline")
        return (this.newComment.style = "border: 1px solid blue; ");
    },
    focusInput() {
      // console.log(this.$refs.input);
    },
    replyMode() {
      this.isReplyMode = !this.isReplyMode;
    },
    addReply() {
      if (!this.comment.replies) this.comment.replies=[]
      
    },
  },

  mounted() {
    this.focusInput();
  },
};
</script>