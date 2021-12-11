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
          <input type="text" v-model="input" :style="{ changeStyle }" />
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
          <button @click.prevent="mentionMode">@ mention</button>
        </div>
        <user-list
          :users="users"
          @addMember="mentionMember"
          @closeList="closeList"
          v-if="isEditMode && isMentionMode"
        />
        <button class="save-btn" @click="closeList">Update</button>
      </div>
    </form>
    <a href="#" v-if="!isEditMode"
      ><i class="far fa-envelope"></i>Write updates via email:</a
    >
    <ul>
      <li v-for="(comment, idx) in task.comments" :key="idx">
        <section class="update-card">
          <div class="top">
            <div class="card-btn flex">
              <div class="time flex">
                <i class="far fa-clock"></i>
                <p><time-stamp :time="comment.createdAt" /></p>
              </div>
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
                <section v-if="!comment.byMember.imgUrl">
                  <span class="icon-user"></span>
                </section>
                <avatar
                  v-else
                  class="member-img"
                  :size="45"
                  :src="
                    comment.byMember.imgUrl
                      ? require(`@/pics/${comment.byMember.imgUrl}`)
                      : null
                  "
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
              <button @click="replyMode(comment)">
                <i class="fas fa-reply"></i>reply
              </button>
            </div>
          </div>

          <form
            class="reply-form"
            v-if="isReplyMode && currComment.id === comment.id"
            @submit.prevent="addReply(comment)"
            ref="reply"
          >
            <div class="flex">
              <section v-if="!comment.byMember.imgUrl">
                <span class="icon-user"></span>
              </section>
              <avatar
                v-else
                class="member-img"
                :size="38"
                :src="
                  comment.byMember.imgUrl
                    ? require(`@/pics/${comment.byMember.imgUrl}`)
                    : null
                "
              />

              <div class="input-container">
                <input type="text" v-model="input" />
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
                        <input
                          type="text"
                          v-model="search"
                          placeholder="search"
                        />
                        <i class="fas fa-search"></i>
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
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
                <button @click.prevent>@ mention</button>
              </div>
              <button class="save-btn">Reply</button>
            </div>
          </form>
        </section>

        <section class="reply-list" v-if="comment.replies">
          <ul>
            <li v-for="(reply, idx) in comment.replies" :key="idx">
              <div class="reply-list-item flex">
                <section v-if="!reply.createdBy.imgUrl">
                  <span class="icon-user"></span>
                </section>
                <avatar
                  v-else
                  class="member-img"
                  :size="30"
                  :src="
                    reply.createdBy.imgUrl
                      ? require(`@/pics/${reply.createdBy.imgUrl}`)
                      : null
                  "
                />
                <div class="creator-info flex">
                  <span>{{ reply.createdBy.fullname }}</span>
                  <p>{{ reply.txt }}</p>
                </div>
              </div>
              <section class="reply-info flex">
                <div class="flex">
                  <i class="far fa-clock"></i>
                  <p><time-stamp :time="reply.createdAt" /></p>
                </div>
                <span>|</span>
                <div class="flex">
                  <p>2</p>
                  <i class="far fa-eye"></i>
                </div>
                <span>|</span>
                <i class="far fa-thumbs-up"></i>
              </section>
            </li>
          </ul>

          <section
            v-if="comment.replies && !isSecondaryReplyMode"
            class="reply-secondary flex"
          >
            <section v-if="!loggedInUser.imgUrl">
              <span class="icon-user"></span>
            </section>
            <avatar
              v-else
              class="member-img"
              :size="30"
              :src="
                loggedInUser.imgUrl
                  ? require(`@/pics/${loggedInUser.imgUrl}`)
                  : null
              "
            />
            <input
              type="text"
              placeholder="Write a reply..."
              @click="secondaryReply(comment)"
            />
          </section>

          <form
            class="reply-form"
            v-if="isSecondaryReplyMode && currComment.id === comment.id"
            @submit.prevent="addReply(comment)"
            ref="reply"
          >
            <div class="flex">
              <section v-if="!comment.byMember.imgUrl">
                <span class="icon-user"></span>
              </section>

              <avatar
                v-else
                class="member-img"
                :size="38"
                :src="
                  comment.byMember.imgUrl
                    ? require(`@/pics/${comment.byMember.imgUrl}`)
                    : null
                "
              />

              <div class="input-container">
                <input type="text" v-model="input" />
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
                        <input
                          type="text"
                          v-model="search"
                          placeholder="search"
                        />
                        <i class="fas fa-search"></i>
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
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
                <button @click.prevent>@ mention</button>
              </div>
              <button class="save-btn">Reply</button>
            </div>
          </form>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
import { utilService } from "@/services/util.service.js";
import { EmojiPicker } from "vue-emoji-picker";
import { boardService } from "@/services/board.service.js";
import userList from "./user-list.vue";
import timeStamp from "./time-stamp.vue";
import Avatar from "vue-avatar";

export default {
  name: "task-updates",
  props: ["task", "currBoard", "users", "loggedInUser"],
  components: {
    EmojiPicker,
    userList,
    timeStamp,
    Avatar,
  },
  data() {
    return {
      isEditMode: false,
      isMentionMode: false,
      isReplyMode: false,
      isSecondaryReplyMode: false,
      newComment: null,
      currComment: null,
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
      if (!this.input || !this.loggedInUser) {
        //add message cant add in Guest mode
        this.setEdit();
        return;
      }
      this.newComment.txt = this.input;
      console.log(this.input);
      this.input = "";
      console.log(this.input);
      this.newComment.byMember = this.loggedInUser;
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
    mentionMode(comment = this.newComment) {
      this.isMentionMode = true;
      // this.input += "@";
    },
    replyMode(comment) {
      this.currComment = comment;
      this.isReplyMode = !this.isReplyMode;
    },
    secondaryReply(comment) {
      this.currComment = comment;
      this.isSecondaryReplyMode = !this.isSecondaryReplyMode;
    },
    mentionMember(member) {
      this.input += " @" + member.fullname;
    },
    closeList() {
      this.isMentionMode = false
    },
    addReply(comment) {
      // console.log(this.input);
      if (!this.input || !this.loggedInUser) {
        //add message cant add in Guest mode
        this.isReplyMode = false;
        this.isSecondaryReplyMode = false;
        return;
      }
      if (!comment.replies) comment.replies = [];
      const reply = {
        id: utilService.makeId(),
        txt: this.input,
        createdAt: Date.now(),
        createdBy: this.loggedInUser,
      };
      comment.replies.push(reply);
      this.$emit("editTask", this.task);
      this.input = "";
      this.isReplyMode = false;
      this.isSecondaryReplyMode = false;
    },
  },
};
</script>