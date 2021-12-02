<template>
  <section class="task-updates flex">
    <form>
      <input type="text" placeholder="Write an update..." />
    </form>
    <a href="#"><i class="far fa-envelope"></i>Write updates via email:</a>
    <div class="updates-container">
      <ul>
          <li v-for="(comment,idx) in task.comments" :key="idx">
              <img :src= comment.imgUrl>
              
              {{comment.txt}}
              </li> 
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "task-updates",
  props: ["task"],
};
</script>