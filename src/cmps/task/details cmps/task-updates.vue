<template>
  <section class="task-updates flex">
    <form>
      <input type="text" placeholder="Write an update..." />
    </form>
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
                <img class="user-img" :src="comment.byMember.imgUrl" />
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
export default {
  name: "task-updates",
  props: ["task"],
};
</script>