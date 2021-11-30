<template>
  <section>
    <header class="board-header">
      <div class="board-details">
        <a>Share</a>
        <a>Proj Name</a>
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
import boardFilter from "@/cmps/board-filter.vue";
import board from "@/cmps/board.vue";
export default {
  components: {
    boardFilter,
    board,
  },
  props: [],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>