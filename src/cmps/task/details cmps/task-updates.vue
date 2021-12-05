<template>
  <section class="task-updates flex">
    <form v-if="isEditMode">
      <div class="text-edit">
        <i class="fas fa-paragraph"></i>
        <i class="fas fa-bold"></i>
        <i class="fas fa-italic"></i>
        <i class="fas fa-underline"></i>
        <i class="fas fa-strikethrough"></i>
      </div>
      <hr />
      <div class="comment-input">
        <input type="text" @blur="setEdit" v-model="input"/>
      </div>
      <div>
        <!-- <textarea ></textarea> -->

       
      </div>
    </form>
    <input
      v-if="!isEditMode"
      type="text"
      placeholder="Write an update..."
      @focus="setEdit"
    />
<div class="actions-footer flex">
  <button><span class="icon-clip"></span> add files</button>
    <emoji-picker @emoji="insert" :search="search" >
          <div 
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
          >
            <button type="button"><i class="far fa-smile"></i> Emoji</button>
          </div>
          <div class="emoji-picker" slot="emoji-picker" slot-scope="{ emojis, insert,}">
            <div>
              <div class="emoji-search">
                <input type="text" v-model="search" placeholder="search"/>
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
</div>
    <a href="#"><i class="far fa-envelope"></i>Write updates via email:</a>
    <ul>
      <li v-for="(comment, idx) in task.comments" :key="idx">
        <div class="update-card">
          <div class="top">
            <div class="card-btn">
              <i class="far fa-clock"><span>19h</span></i>
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
                    ><i class="fas fa-link"></i>Copy link to
                    update</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeTask"
                    ><i class="fas fa-pencil-alt"></i>Edit
                    update</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeTask"
                    ><i class="far fa-trash-alt"></i>Delete update for
                    everyone</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeTask" disabled
                    ><i class="far fa-envelope"></i>Share
                    update</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="removeTask"
                    ><i class="far fa-bookmark"></i>Bookmark</el-dropdown-item
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
              <button><i class="far fa-thumbs-up"></i> like</button>
            </div>
            <div>
              <button><i class="fas fa-reply"></i> reply</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { EmojiPicker } from 'vue-emoji-picker'


export default {
  name: "task-updates",
  props: ["task"],
  components:{
    EmojiPicker
  },
  data() {
    return {
      isEditMode: true,
      input: "",
      search: "",
    };
  },
  methods: {
    insert(emoji) {
      this.input += emoji;
    },
    saveComment() {},
    setEdit() {
      // this.isEditMode = !this.isEditMode;
    },
  },
};
</script>