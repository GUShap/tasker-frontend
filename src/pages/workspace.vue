<template>
  <section class="workspace-container">
    <header class="board-header">
      <div class="board-details">
        <!-- <font-awesome-icon icon="faCoffee " /> -->
        <a>{{ currBoard.title }}</a>
        <a>show/hide</a>
        <a>star</a>
      </div>
      <div class="more-actions">
        <a>Last seen</a>
        <a>Invite</a>
        <a>Activities</a>
        <a>+</a>
        <a>...</a>
      </div>
    </header>
    <board-filter />
    <board />
  </section>
</template>

<script>
import { board } from "../../database.js";
import boardFilter from "@/cmps/board-filter.vue";
// import board from "@/cmps/board.vue";
export default {
  components: {
    boardFilter,
    board,
  },
  props: [],
  data() {
    return {
      currBoard: board,
    };
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>